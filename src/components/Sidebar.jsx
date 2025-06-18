export default function Sidebar({ chats, selectChat }) {
  return (
    <div className="w-1/4 bg-[#111] p-4 overflow-y-auto border-r border-white">
      <h2 className="text-lg mb-4">Prompt History</h2>
      {chats.map((chat, index) => (
        <div
          key={index}
          onClick={() => selectChat(index)}
          className="cursor-pointer text-sm hover:underline"
        >
          {chat.prompt.slice(0, 40)}...
        </div>
      ))}
    </div>
  );
}
