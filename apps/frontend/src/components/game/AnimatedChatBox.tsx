"use client";

/**
 * ANIMATED CHAT BOX - Game Chat with Smooth Animations
 * Real-time chat UI with typing indicators and emoji support
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { fadeInUp, slideInLeft, staggerFast } from "@/lib/animations";

// TYPES

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: Date;
  type: "player" | "system" | "guild" | "private";
}

export interface ChatBoxProps {
  messages?: ChatMessage[];
  onSendMessage?: (message: string) => void;
  currentUserId?: string;
}

// CHAT TABS

const CHAT_TABS = [
  { id: "all", label: "Tümü", icon: "💬" },
  { id: "guild", label: "Klan", icon: "🛡️" },
  { id: "private", label: "Özel", icon: "✉️" },
  { id: "system", label: "Sistem", icon: "⚙️" },
];

// MESSAGE TYPES CONFIG

const MESSAGE_TYPE_CONFIG = {
  player: {
    bg: "bg-slate-700/50",
    border: "border-slate-600",
  },
  system: {
    bg: "bg-blue-900/30",
    border: "border-blue-600",
  },
  guild: {
    bg: "bg-purple-900/30",
    border: "border-purple-600",
  },
  private: {
    bg: "bg-pink-900/30",
    border: "border-pink-600",
  },
};

// CHAT MESSAGE COMPONENT

const ChatMessageItem = ({
  message,
  isCurrentUser,
}: {
  message: ChatMessage;
  isCurrentUser: boolean;
}) => {
  const config = MESSAGE_TYPE_CONFIG[message.type];

  return (
    <motion.div
      variants={slideInLeft}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -50 }}
      className={`mb-2 rounded-lg border ${config.border} ${config.bg} p-3`}
      layout
    >
      {/* User info */}
      <div className="mb-2 flex items-center gap-2">
        {/* Avatar */}
        <motion.div
          className="relative h-8 w-8 overflow-hidden rounded-full"
          whileHover={{ scale: 1.1 }}
        >
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-sm font-bold text-white">
            {message.avatar}
          </div>

          {/* Online status */}
          <motion.div
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-slate-700 bg-green-500"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Username */}
        <div className="flex-1">
          <div
            className={`text-sm font-semibold ${
              isCurrentUser ? "text-red-400" : "text-white"
            }`}
          >
            {message.username}
            {isCurrentUser && (
              <span className="ml-2 rounded bg-red-600 px-1.5 py-0.5 text-xs">Sen</span>
            )}
          </div>
          <div className="text-xs text-gray-400">
            {message.timestamp.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>

      {/* Message */}
      <motion.p
        className="text-sm text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {message.message}
      </motion.p>
    </motion.div>
  );
};

// TYPING INDICATOR

const TypingIndicator = ({ username }: { username: string }) => {
  return (
    <motion.div
      className="mb-2 flex items-center gap-2 rounded-lg bg-slate-700/30 p-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <span className="text-sm text-gray-400">{username} yazıyor</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-red-500"
            animate={{
              y: [0, -5, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// MAIN COMPONENT

export const AnimatedChatBox = ({
  messages = [],
  onSendMessage,
  currentUserId = "current-user",
}: ChatBoxProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Filter messages by tab
  const filteredMessages =
    activeTab === "all"
      ? messages
      : messages.filter((m) => m.type === activeTab);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage?.(inputValue);
    setInputValue("");
  };

  return (
    <div className="flex h-[600px] flex-col rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 shadow-2xl">
      {/* Header with tabs */}
      <div className="border-b border-slate-700 p-4">
        <div className="flex gap-2">
          {CHAT_TABS.map((tab) => (
            <motion.button
              key={tab.id}
              className={`relative rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}

              {/* Active indicator */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Unread badge */}
              {tab.id === "private" && (
                <motion.div
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  3
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredMessages.map((message) => (
              <ChatMessageItem
                key={message.id}
                message={message}
                isCurrentUser={message.userId === currentUserId}
              />
            ))}

            {/* Typing indicator */}
            {isTyping && <TypingIndicator username="Oyuncu123" />}
          </AnimatePresence>
        </motion.div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex gap-2">
          {/* Emoji button */}
          <motion.button
            className="rounded-lg bg-slate-700 p-3 text-xl hover:bg-slate-600"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            😊
          </motion.button>

          {/* Input field */}
          <motion.div
            className="relative flex-1"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Mesajını yaz..."
              className="w-full rounded-lg border-2 border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder-gray-400 focus:border-red-600 focus:outline-none"
            />

            {/* Character count */}
            <motion.div
              className="absolute bottom-1 right-2 text-xs text-gray-500"
              animate={{
                color: inputValue.length > 200 ? "#ef4444" : "#6b7280",
              }}
            >
              {inputValue.length}/250
            </motion.div>
          </motion.div>

          {/* Send button */}
          <motion.button
            className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white disabled:opacity-50"
            onClick={handleSend}
            disabled={!inputValue.trim()}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Gönder
          </motion.button>
        </div>

        {/* Quick actions */}
        <motion.div
          className="mt-2 flex gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {["👋 Selam", "😂 LOL", "⚔️ Savaş!", "🎉 Tebrikler"].map((quick, i) => (
            <motion.button
              key={i}
              className="rounded-full bg-slate-700/50 px-3 py-1 text-xs text-gray-300 hover:bg-slate-600"
              onClick={() => setInputValue(quick)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {quick}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// EXAMPLE DATA

export const EXAMPLE_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    userId: "user1",
    username: "OsmanlıAslanı",
    avatar: "🦁",
    message: "Kimse boss'a gelmek ister mi?",
    timestamp: new Date(Date.now() - 300000),
    type: "player",
  },
  {
    id: "2",
    userId: "system",
    username: "Sistem",
    avatar: "⚙️",
    message: "Sunucu bakımı 5 dakika içinde başlayacak.",
    timestamp: new Date(Date.now() - 240000),
    type: "system",
  },
  {
    id: "3",
    userId: "user2",
    username: "YeniçeriKahraman",
    avatar: "⚔️",
    message: "Geliyorum! 2 dk",
    timestamp: new Date(Date.now() - 180000),
    type: "player",
  },
  {
    id: "4",
    userId: "current-user",
    username: "Sen",
    avatar: "🌟",
    message: "Ben de varım, klan liderine haber verdim",
    timestamp: new Date(Date.now() - 120000),
    type: "player",
  },
  {
    id: "5",
    userId: "guild",
    username: "Klan Bildirimi",
    avatar: "🛡️",
    message: "Klan savaşı 30 dakika içinde başlıyor!",
    timestamp: new Date(Date.now() - 60000),
    type: "guild",
  },
];
