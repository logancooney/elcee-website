'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      message: "Hey — got questions about the studio, mixing, or tutoring? Ask away.",
      sender: 'bot',
      timestamp: Date.now(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) setShowTooltip(false);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      message: inputMessage,
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage, sessionId }),
      });

      const data = await response.json();

      const delay = Math.floor(Math.random() * 1000) + 400;
      await new Promise(resolve => setTimeout(resolve, delay));

      if (data.response) {
        setMessages(prev => [...prev, data.response]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          message: "Something went wrong. Book directly at /booking or email elcee.mgmt@gmail.com",
          sender: 'bot',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bubble */}
      {!isOpen && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
          {showTooltip && (
            <div style={{
              position: 'absolute',
              bottom: 60,
              right: 0,
              background: '#fafafa',
              color: '#080808',
              padding: '10px 16px',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              Got questions? Ask here.
            </div>
          )}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            style={{
              width: 48,
              height: 48,
              background: '#fafafa',
              color: '#080808',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}

      {/* Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 50,
          width: 360,
          height: 520,
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div>
              <p style={{ fontWeight: 900, fontSize: 13, letterSpacing: '-0.01em', color: '#fafafa' }}>
                The Alchemist Studio
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em', marginTop: 2 }}>
                Usually replies fast
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1,
                fontSize: 20,
                padding: 4,
              }}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '10px 14px',
                  background: msg.sender === 'user' ? '#fafafa' : 'rgba(255,255,255,0.06)',
                  color: msg.sender === 'user' ? '#080808' : '#fafafa',
                  fontSize: 13,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line',
                }}>
                  {msg.message}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,0.06)',
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center',
                }}>
                  {[0, 150, 300].map(delay => (
                    <span
                      key={delay}
                      style={{
                        width: 6,
                        height: 6,
                        background: 'rgba(255,255,255,0.4)',
                        borderRadius: '50%',
                        display: 'inline-block',
                        animation: 'scrollPulse 1s ease-in-out infinite',
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            gap: 8,
          }}>
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything..."
              disabled={isLoading}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fafafa',
                padding: '10px 14px',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                background: inputMessage.trim() && !isLoading ? '#fafafa' : 'rgba(255,255,255,0.1)',
                color: inputMessage.trim() && !isLoading ? '#080808' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'default',
                padding: '0 16px',
                fontSize: 16,
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
