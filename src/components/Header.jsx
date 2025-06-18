import React from 'react';
import profile from '../assets/profile.png';
import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="flex items-center justify-between bg-black p-4 border-b border-white">
      <h1 className="text-4xl font-bold tracking-wide">Ask Anything About Tarun</h1>
      <div className="flex flex-col items-center">
        <img src={profile} alt="Tarun" className="w-24 h-24 rounded-full mb-2 border-2 border-white" />
        <div className="flex gap-4">
          <a href="https://wa.me/7737343549" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="text-white text-xl hover:text-green-400" />
          </a>
          <a href="https://www.linkedin.com/in/gehlottarun1898/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-white text-xl hover:text-blue-400" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
