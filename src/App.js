import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VoiceBot from './components/VoiceBot';

function App() {
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="flex h-screen bg-black text-white font-bebas">
      <Sidebar messages={chatHistory} />
      <div className="flex-1 flex flex-col">
        <Header />
        <VoiceBot setChatHistory={setChatHistory} />
      </div>
    </div>
  );
}

export default App;