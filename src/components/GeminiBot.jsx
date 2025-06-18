import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const GeminiBot = ({ setChatHistory }) => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    setChatHistory((prev) => [...prev, input]);
    setResponse('Thinking...');

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: input }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No reply from Gemini.';
      setResponse(botReply);
      setInput('');
    } catch (error) {
      setResponse('Error connecting to Gemini API.');
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white overflow-y-auto">
      <div className="flex-grow whitespace-pre-line text-black text-2xl font-bebas mb-4">
        {response || 'Ask something...'}
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 p-4 rounded bg-black text-white border border-black text-2xl font-bebas"
        />
        <button onClick={handleSend} className="p-4 rounded-full bg-black">
          <FaPaperPlane className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default GeminiBot;