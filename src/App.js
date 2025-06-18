import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import GeminiBot from './components/GeminiBot';

export default function App() {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="flex h-screen bg-white text-black font-bebas">
      <Sidebar messages={chatHistory} />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <GeminiBot setChatHistory={setChatHistory} />
      </div>
    </div>
  );
}