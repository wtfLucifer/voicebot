import { FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import tarunImage from '../assets/tarun.png';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border-b border-white">
      <div>
        <h1 className="text-3xl font-bold tracking-wider">Ask anything about Tarun</h1>
        <p className="text-sm text-gray-400">To find out whether he is a good fit for the AI Agent Team</p>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <img src={tarunImage} className="h-14 w-14 rounded-full" alt="Tarun" />
        <div className="flex gap-2">
          <a href="https://wa.me/7737343549" target="_blank"><FaWhatsapp className="text-green-500 text-xl" /></a>
          <a href="https://www.linkedin.com/in/gehlottarun1898/" target="_blank"><FaLinkedin className="text-blue-500 text-xl" /></a>
        </div>
      </div>
    </div>
  );
}
