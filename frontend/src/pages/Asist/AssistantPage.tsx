import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layouts/DefaultLayout.tsx";
import { IoSend } from "react-icons/io5";

interface Message {
    sender: "user" | "assistant";
    text: string;
}

const AssistantPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingDots, setTypingDots] = useState("");
    const wsRef = useRef<WebSocket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Initialize WebSocket connection
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8081/ws");
        wsRef.current = ws;

        ws.addEventListener("open", () => {
            console.log("WebSocket connection established");
        });

        ws.addEventListener("message", (event) => {
            const data = event.data;
            setMessages((prev) => [...prev, { sender: "assistant", text: data }]);
            setIsTyping(false);
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current); // Останавливаем интервал
            }
        });

        ws.addEventListener("error", (err) => {
            console.error("WebSocket error:", err);
            setIsTyping(false); // Убираем индикатор печати в случае ошибки
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current); // Останавливаем интервал
            }
        });

        ws.addEventListener("close", (e) => {
            console.log("WebSocket closed:", e);
        });

        return () => {
            ws.close();
            if (typingIntervalRef.current) {
                clearInterval(typingIntervalRef.current); // Очистим интервал при размонтировании компонента
            }
        };
    }, []);

    const sendMessage = () => {
        if (!input.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
            return;

        setMessages((prev) => [...prev, { sender: "user", text: input }]);
        setIsTyping(true); // Показываем индикатор печати перед отправкой запроса
        setTypingDots("."); // Начинаем с первой точки
        wsRef.current.send(input);
        setInput("");

        // Запускаем процесс добавления точек
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current); // Останавливаем предыдущий интервал
        }
        typingIntervalRef.current = setInterval(() => {
            setTypingDots((prev) => {
                if (prev === "...") return "."; // Если уже три точки, начинаем заново
                return prev + ".";
            });
        }, 500); // Каждые 500 мс добавляем точку
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <Layout

            content={
                <div className="flex flex-col h-screen p-4">
                    {/* Chat messages area */}
                    <div className="flex-1 overflow-y-auto mt-18 space-y-4 pr-1 mb-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.sender === "assistant" && (
                                    <div
                                        className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 text-white">
                                        🤖
                                    </div>
                                )}
                                <div
                                    className={`px-4 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                                        msg.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Добавляем анимацию печати */}
                        {isTyping && (
                            <div className="flex items-start justify-start space-x-2">
                                <div
                                    className="flex-shrink-0 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2 text-white">
                                    🤖
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 max-w-[75%]">
                                    <span>{typingDots}</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="mt-auto mb-16">
                        <div className="relative">
                            <textarea
                                rows={1}
                                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-y-auto max-h-[8rem]"
                                placeholder="Задайте свой вопрос"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={sendMessage}
                                className="absolute top-[calc(50%-3px)] right-6 transform -translate-y-1/2 text-gray-600 hover:text-gray-300"
                            >
                                <IoSend className="w-6 h-6"/>
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default AssistantPage;
