"use client";

import { useState } from "react";
import { MessageBubble, type ChatMessage } from "@/components/message-bubble";
import { ChatListItem, type Chat } from "@/components/chat-list-item";
import { ChatInput } from "@/components/chat-input";
import { Menu, X } from "lucide-react";

// Mock data
const MOCK_CHATS: Chat[] = [
  {
    id: "global",
    name: "Global Chat",
    avatar: "/mlbb icon.jpg",
    lastMessage: "Anyone up for ranked grind?",
    timestamp: "2 min ago",
    type: "global",
    unreadCount: 3,
  },
  {
    id: "1",
    name: "Shadow Hunters",
    avatar: "/mlbb icon.jpg",
    lastMessage: "Great scrim guys, let's do more!",
    timestamp: "5 min ago",
    type: "group",
    members: 5,
    unreadCount: 2,
  },
  {
    id: "2",
    name: "IceBreaker",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    lastMessage: "You: Available for tonight?",
    timestamp: "1 hour ago",
    type: "direct",
  },
  {
    id: "3",
    name: "Phoenix Rising Team",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMessage: "Practice session scheduled for 8 PM",
    timestamp: "3 hours ago",
    type: "group",
    members: 6,
  },
  {
    id: "4",
    name: "FireStrike",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    lastMessage: "Thanks for the ranked grind!",
    timestamp: "Yesterday",
    type: "direct",
  },
];

const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  global: [
    {
      id: "1",
      sender: { name: "ShadowHunter", avatar: "/mlbb icon.jpg" },
      content: "Anyone up for ranked grind?",
      timestamp: "2 min ago",
    },
    {
      id: "2",
      sender: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "Count me in!",
      timestamp: "1 min ago",
      isOwn: true,
    },
  ],
  "1": [
    {
      id: "1",
      sender: { name: "Shadow Hunters", avatar: "/mlbb icon.jpg" },
      content: "Team practice in 10 minutes!",
      timestamp: "10 min ago",
    },
    {
      id: "2",
      sender: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "On my way!",
      timestamp: "5 min ago",
      isOwn: true,
    },
    {
      id: "3",
      sender: { name: "Shadow Hunters", avatar: "/mlbb icon.jpg" },
      content: "Great scrim guys, let's do more!",
      timestamp: "5 min ago",
    },
  ],
  "2": [
    {
      id: "1",
      sender: {
        name: "IceBreaker",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      content: "Yo! How's it going?",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      sender: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "Pretty good! You?",
      timestamp: "2 hours ago",
      isOwn: true,
    },
    {
      id: "3",
      sender: {
        name: "IceBreaker",
        avatar:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      },
      content: "Looking to grind some ranked later, interested?",
      timestamp: "1 hour ago",
    },
    {
      id: "4",
      sender: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content: "Available for tonight?",
      timestamp: "1 hour ago",
      isOwn: true,
    },
  ],
};

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string>("global");
  const [messages, setMessages] = useState<ChatMessage[]>(MOCK_MESSAGES.global);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);

  const currentChat = MOCK_CHATS.find((c) => c.id === selectedChat);

  const handleSelectChat = (chatId: string) => {
    setIsLoadingChat(true);
    setTimeout(() => {
      setSelectedChat(chatId);
      setMessages(MOCK_MESSAGES[chatId as keyof typeof MOCK_MESSAGES] || []);
      setSidebarOpen(false);
      setIsLoadingChat(false);
    }, 200);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      },
      content,
      timestamp: "now",
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="flex h-screen bg-black pt-16">
      {/* Sidebar - Chat List */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-green-600/20 transform transition-transform duration-300 md:static md:transform-none pt-16 md:pt-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-green-600/20">
            <h2 className="text-lg font-bold text-green-400">Messages</h2>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {MOCK_CHATS.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={selectedChat === chat.id}
                onClick={() => handleSelectChat(chat.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="border-b border-green-600/20 bg-black px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-green-400 hover:bg-green-600/10 rounded-lg transition-colors mr-2"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1">
            {currentChat && (
              <div>
                <h1 className="text-lg font-bold text-green-400">
                  {currentChat.name}
                </h1>
                {currentChat.type === "group" && (
                  <p className="text-xs text-gray-500">
                    {currentChat.members} members
                  </p>
                )}
                {currentChat.type === "global" && (
                  <p className="text-xs text-blue-400">Global chat</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoadingChat ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 border-4 border-green-600/30 border-t-green-500 rounded-full animate-spin"></div>
                <p className="text-green-400 text-sm font-semibold">
                  Loading chat...
                </p>
              </div>
            </div>
          ) : messages.length > 0 ? (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm">
                No messages yet. Start a conversation!
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
