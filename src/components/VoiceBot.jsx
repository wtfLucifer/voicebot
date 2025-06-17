// File: src/components/VoiceBot.jsx
import React, { useState, useEffect, useRef } from "react";
import { FaPlayCircle, FaPauseCircle, FaPaperPlane } from "react-icons/fa";

const VoiceBot = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const recognitionRef = useRef(null);

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Web Speech API is not supported in this browser");
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    setTranscript("");
    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current.stop();
    setListening(false);
  };

  const sendMessage = async () => {
    if (!transcript.trim()) return;
    const newMessages = [...messages, { role: "user", text: transcript }];
    setMessages(newMessages);
    setTranscript("");

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an AI trained to answer exactly like Tarun. Tarun is candid, witty, emotionally intelligent, and speaks in short, thoughtful sentences. Use humor when appropriate, and speak as if you’re talking to a smart friend.",
        },
        ...newMessages.map((msg) => ({ role: msg.role, content: msg.text })),
      ],
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
  };

  return (
    <div className="bg-black text-white min-h-screen flex font-bebas">
      <aside className="w-64 p-4 border-r border-white/20 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 tracking-wide">History</h2>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-2 text-sm ${m.role === "user" ? "text-pink-400" : "text-green-400"}`}
          >
            <b>{m.role === "user" ? "You" : "Bot"}:</b> {m.text}
          </div>
        ))}
      </aside>
      <main className="flex-1 flex flex-col p-8 justify-end">
        <div className="bg-white text-black p-4 rounded-xl min-h-[100px]">
          <textarea
            className="w-full h-24 resize-none p-2 text-lg"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Speak or type your message..."
          ></textarea>
        </div>
        <div className="flex gap-4 mt-4 items-center">
          {!listening ? (
            <button onClick={startListening} className="bg-white text-black p-4 rounded-full text-3xl">
              <FaPlayCircle />
            </button>
          ) : (
            <button onClick={stopListening} className="bg-white text-black p-4 rounded-full text-3xl">
              <FaPauseCircle />
            </button>
          )}
          <button onClick={sendMessage} className="bg-white text-black p-4 rounded-full text-3xl">
            <FaPaperPlane />
          </button>
        </div>
      </main>
    </div>
  );
};

export default VoiceBot;



