import VoiceBot from './components/VoiceBot';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
  return (
    <div className="h-screen bg-black text-white font-bebas">
      <Header />
      <div className="flex h-[calc(100%-5rem)]">
        <Sidebar />
        <VoiceBot />
      </div>
    </div>
  );
}

export default App;
