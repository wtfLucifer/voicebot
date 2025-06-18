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
    <div className="flex-1 flex flex-col justify-end p-4 bg-black">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 p-3 rounded bg-gray-900 border border-white text-white"
        />
        {!isRecording ? (
          <button onClick={handleSpeechInput} className="p-3 rounded-full bg-white text-black">
            <FaMicrophone />
          </button>
        ) : (
          <button onClick={stopSpeechInput} className="p-3 rounded-full bg-red-600 text-white">
            <FaStop />
          </button>
        )}
        <button onClick={handleSend} className="p-3 rounded-full bg-white text-black">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default VoiceBot;
