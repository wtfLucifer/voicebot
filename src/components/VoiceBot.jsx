import React, { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa';

const VoiceBot = ({ setChatHistory }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const handleSpeechInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopSpeechInput = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setChatHistory((prev) => [...prev, input]);
    setInput('');
    // Call OpenAI or local training API here
  };

  return (
    <div className="flex-1 flex flex-col justify-end p-6 bg-white overflow-y-auto">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question or speak..."
          className="flex-1 p-4 rounded bg-black text-white border border-black text-2xl font-bebas"
        />
        {!isRecording ? (
          <button onClick={handleSpeechInput} className="p-4 rounded-full bg-white border-2 border-black">
            <FaMicrophone className="text-red-600 text-2xl" />
          </button>
        ) : (
          <button onClick={stopSpeechInput} className="p-4 rounded-full bg-red-600">
            <FaStop className="text-white text-2xl" />
          </button>
        )}
        <button onClick={handleSend} className="p-4 rounded-full bg-black">
          <FaPaperPlane className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default VoiceBot;