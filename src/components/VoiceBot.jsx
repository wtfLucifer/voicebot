import React, { useState, useEffect } from 'react';
import { FaCircle, FaStop, FaPaperPlane } from 'react-icons/fa';

export default function VoiceBot() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [response, setResponse] = useState('');

  // Web Speech API
  let recognition;

  if ('webkitSpeechRecognition' in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }

  const startListening = () => {
    setTranscript('');
    setIsRecording(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsRecording(false);
    recognition.stop();
  };

  const sendPrompt = async () => {
    if (!transcript.trim()) return;

    const updatedHistory = [...chatHistory, { prompt: transcript }];
    setChatHistory(prev => [...prev, prompt]);
    setResponse(''); // Clear previous response
    setTranscript('');

    // Call OpenAI API (add your own key here securely via env variable)
    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: transcript }],
        }),
      });

      const data = await result.json();
      const botReply = data.choices[0]?.message?.content || 'No response';

      setResponse(botReply);
    } catch (error) {
      setResponse('Error fetching response.');
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex-grow overflow-y-auto p-4 border border-white rounded-xl bg-[#111]">
        {response ? (
          <div className="text-xl whitespace-pre-line">{response}</div>
        ) : (
          <div className="text-gray-400 text-center">Your response will appear here...</div>
        )}
      </div>

      <div className="mt-4 flex items-center space-x-3">
        {/* RECORD or STOP Button */}
        {!isRecording ? (
          <FaCircle className="text-red-600 text-3xl cursor-pointer" onClick={startListening} />
        ) : (
          <FaStop className="text-white text-3xl cursor-pointer" onClick={stopListening} />
        )}

        {/* Editor shows up only after recording */}
        {transcript && (
          <>
            <input
              type="text"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              className="flex-1 bg-[#222] text-white p-2 rounded border border-white"
              placeholder="Your question..."
            />
            <FaPaperPlane className="text-xl cursor-pointer text-white" onClick={sendPrompt} />
          </>
        )}
      </div>
    </div>
  );
}
