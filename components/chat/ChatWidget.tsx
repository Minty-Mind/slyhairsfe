"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { TextStreamChatTransport } from "ai";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ChatWindow({ onClose }: { onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const transport = useMemo(() => new TextStreamChatTransport({ api: `${API_BASE}/api/chat` }), [API_BASE]);

  const { messages, sendMessage, status } = useChat({
    transport,
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (text?: string) => {
    const msg = text || inputValue.trim();
    if (!msg || isLoading) return;
    sendMessage({ text: msg });
    setInputValue("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-neutral-950 border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-neutral-900">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center">
            <Bot size={18} className="text-gold-500" />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold">SlyHairs Assistant</h3>
            <p className="text-green-400 text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center">
              <Bot size={24} className="text-gold-500" />
            </div>
            <div>
              <p className="text-white text-sm font-bold">Hi! How can I help?</p>
              <p className="text-gray-500 text-xs mt-1">Ask me about our hair products, textures, care tips, or orders.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center pt-2">
              {["What textures do you have?", "Best wig for beginners?", "Hair care tips"].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-white/10 text-gray-400 hover:text-gold-500 hover:border-gold-500/30 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex gap-2.5",
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
              msg.role === "user" ? "bg-gold-500/10" : "bg-white/5"
            )}>
              {msg.role === "user" ? (
                <User size={14} className="text-gold-500" />
              ) : (
                <Bot size={14} className="text-gray-400" />
              )}
            </div>
            <div className={cn(
              "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap",
              msg.role === "user"
                ? "bg-gold-500 text-black rounded-br-sm"
                : "bg-neutral-900 text-gray-300 border border-white/5 rounded-bl-sm"
            )}>
              {msg.parts
                .filter((part): part is { type: "text"; text: string } => part.type === "text")
                .map((part, i) => (
                  <span key={i}>{part.text}</span>
                ))}
            </div>
          </div>
        ))}

        {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
              <Bot size={14} className="text-gray-400" />
            </div>
            <div className="bg-neutral-900 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-white/5 bg-neutral-900">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about our products..."
            className="flex-1 h-10 bg-black border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50"
          />
          <Button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="h-10 w-10 bg-gold-500 text-black rounded-xl hover:bg-gold-400 disabled:opacity-30 shrink-0"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gold-500 text-black rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20 hover:bg-gold-400 transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {open && <ChatWindow onClose={() => setOpen(false)} />}
    </>
  );
}
