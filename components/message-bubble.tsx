"use client";

export interface ChatMessage {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  isOwn?: boolean;
}

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div
      className={`flex gap-3 mb-4 ${message.isOwn ? "flex-row-reverse" : ""}`}
    >
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-green-600/20 border border-green-600/30">
        <img
          src={message.sender.avatar}
          alt={message.sender.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/mlbb icon.jpg";
          }}
        />
      </div>
      <div className={`flex flex-col ${message.isOwn ? "items-end" : ""}`}>
        <p className="text-xs text-gray-400 mb-1">{message.sender.name}</p>
        <div
          className={`px-4 py-2 rounded-lg max-w-xs md:max-w-md ${
            message.isOwn
              ? "bg-green-600 text-black font-semibold"
              : "bg-gray-800 text-gray-100 border border-green-600/30"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
      </div>
    </div>
  );
}
