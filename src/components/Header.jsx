import React from 'react';
import profile from '../assets/profile.png';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-white p-6 border-b border-black">
      <div>
        <h1 className="text-[3.5rem] font-bangers leading-tight">Ask Anything About Tarun</h1>
        <p className="text-[1.75rem] font-bangers mt-2">(To find out whether he is a good fit for the AI Agent Team)</p>
      </div>
      <div className="flex flex-col items-center">
        <img src={profile} alt="Tarun" className="w-32 h-32 rounded-full mb-2 border-2 border-black" />
        <div className="flex gap-4">
          <a href="https://wa.me/7737343549" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-black text-2xl hover:text-green-500" />
          </a>
          <a href="https://www.linkedin.com/in/gehlottarun1898/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-black text-2xl hover:text-blue-600" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
