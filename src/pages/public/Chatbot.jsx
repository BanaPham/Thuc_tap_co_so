import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";
import '../../styles/public/Chatbot.css';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào! Mình là trợ lý ảo ShopZone. Mình có thể giúp gì cho bạn hôm nay?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = "AIzaSyAVTR68njpikfDMzUHxaXT-H-Sz2UtbJb4"; 
      const ai = new GoogleGenAI({ apiKey: apiKey });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: userMessage.text,
        config: {
          systemInstruction: "Bạn là một trợ lý ảo thông minh của sàn thương mại điện tử ShopZone.vn. Hãy trả lời bằng tiếng Việt, ngắn gọn, lịch sự.",
          temperature: 0.3,
        }
      });

      const aiReply = response.text;
      setMessages((prev) => [...prev, { sender: "bot", text: aiReply }]);

    } catch (error) {
      console.error("Lỗi gọi Gemini API trực tiếp từ FE:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Không thể kết nối trực tiếp đến Gemini. Kiểm tra lại API Key hoặc mạng nhé!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chatbot-toggle-btn">
            🤖
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <span className="chatbot-title">🤖 Trợ lý ảo ShopZone</span>
            <button onClick={() => setIsOpen(false)} className="chatbot-close-btn">✖</button>
          </div>

          {/* Nội dung tin nhắn */}
          <div className="chatbot-messages-area">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chatbot-message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-loading">
                ShopZone đang suy nghĩ...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <div className="chatbot-input-area">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} 
              placeholder="Nhập câu hỏi của bạn..." 
              className="chatbot-input-field" 
            />
            <button onClick={handleSendMessage} className="chatbot-send-btn">Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
}