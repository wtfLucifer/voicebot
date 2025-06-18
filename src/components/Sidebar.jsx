import React from 'react';

const Sidebar = ({ messages = [] }) => {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500">No chats yet.</p>
      ) : (
        messages.map((msg, index) => (
          <div key={index} className="mb-2 p-2 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer">
            {msg.slice(0, 40)}...
          </div>
        ))
      )}
    </div>
  );
};

export default Sidebar;
