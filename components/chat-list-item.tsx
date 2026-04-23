"use client";

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  type: "direct" | "group" | "global";
  members?: number;
}

interface ChatListItemProps {
  chat: Chat;
  isActive: boolean;
  onClick: () => void;
}

export function ChatListItem({ chat, isActive, onClick }: ChatListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 border-b border-green-600/20 transition-all hover:bg-green-600/10 ${
        isActive ? "bg-green-600/20 border-l-4 border-l-green-500" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-green-600/20 border border-green-600/30">
          <img
            src={chat.avatar}
            alt={chat.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/mlbb icon.jpg";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-green-400 truncate">
              {chat.name}
            </h3>
            {chat.type === "group" && (
              <span className="text-xs bg-green-600/20 text-green-300 px-2 py-0.5 rounded">
                {chat.members} members
              </span>
            )}
            {chat.type === "global" && (
              <span className="text-xs bg-blue-600/20 text-blue-300 px-2 py-0.5 rounded">
                Global
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
          <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
        </div>
        {chat.unreadCount && chat.unreadCount > 0 && (
          <div className="w-5 h-5 bg-green-500 text-black text-xs rounded-full flex items-center justify-center font-bold shrink-0">
            {chat.unreadCount}
          </div>
        )}
      </div>
    </button>
  );
}
