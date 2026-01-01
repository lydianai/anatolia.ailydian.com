'use client';

import * as React from 'react';
import { Send, X } from 'lucide-react';
import { useChatStore, selectActiveMessages, selectRooms } from '@/lib/store/chatStore';
import { useSocket } from '@/lib/hooks/useSocket';
import { formatRelativeTime } from '@/lib/utils/format';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

export function ChatBox() {
  const { sendChatMessage } = useSocket();
  const messages = useChatStore(selectActiveMessages);
  const rooms = useChatStore(selectRooms);
  const { activeRoomId, setActiveRoom, isOpen, toggleChat } = useChatStore();

  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opening chat
  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    sendChatMessage(input, activeRoomId);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="absolute bottom-4 left-4 bg-turkish-red hover:bg-turkish-red-600 text-white rounded-full p-3 shadow-lg transition-colors"
        aria-label="Sohbeti aç"
      >
        <Send className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 w-96 max-h-[500px] bg-black/80 backdrop-blur-sm rounded-lg border border-turkish-red/30 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-turkish-red/30">
        <div className="flex gap-2">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={cn(
                'px-3 py-1 rounded text-sm font-medium transition-colors relative',
                activeRoomId === room.id
                  ? 'bg-turkish-red text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              )}
            >
              {room.name}
              {room.unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-turkish-gold text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {room.unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={toggleChat}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Sohbeti kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-[200px] max-h-[300px]">
        {messages.length === 0 ? (
          <div className="text-center text-white/40 text-sm py-8">
            Henüz mesaj yok
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'text-sm',
                message.isSystem ? 'text-yellow-400 italic' : 'text-white'
              )}
            >
              <span className="text-white/60 text-xs">
                {formatRelativeTime(message.timestamp)}
              </span>
              {' '}
              {!message.isSystem && (
                <span className="font-semibold text-turkish-gold">
                  {message.displayName || message.username}:
                </span>
              )}
              {' '}
              <span>{message.message}</span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 border-t border-turkish-red/30">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-turkish-red"
            maxLength={200}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
