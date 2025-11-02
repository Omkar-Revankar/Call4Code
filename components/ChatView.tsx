"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

interface Message {
    role: "user" | "ai" | "typing";
    content: string;
}

export default function ChatView() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "ai",
            content:
                "👋 Hello! I’m your Tender Intelligence Assistant. You can ask me about material costs, tender classifications, or contractor evaluations.",
        },
    ]);
    const [input, setInput] = useState("");
    const [responseIndex, setResponseIndex] = useState(0);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const mockResponses = [
        "Based on the latest material prices, cement costs ₹420 per bag and steel ₹74,000 per tonne.",
        "This tender seems slightly overpriced compared to market averages, possibly due to inflated material costs.",
        "Contractor ABC has used subpar quality materials in similar projects. Proceed with caution.",
        "Estimated total project cost is ₹9.1 lakhs. The contractor’s quote exceeds it by 20%.",
    ];

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        // Simulate "thinking" phase
        setMessages((prev) => [
            ...prev,
            { role: "typing", content: "Analyzing tender details..." },
        ]);

        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.role !== "typing")); // remove typing
            const nextResponse = mockResponses[responseIndex % mockResponses.length];
            const aiResponse: Message = { role: "ai", content: nextResponse };
            setMessages((prev) => [...prev, aiResponse]);
            setResponseIndex((prev) => prev + 1);
        }, 2000);
    };

    // Auto-scroll to bottom whenever messages update
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col bg-gradient-to-b from-white via-gray-50 to-indigo-50 rounded-2xl shadow-md p-6 h-[75vh]">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${msg.role === "user"
                                ? "justify-end"
                                : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.role === "user"
                                    ? "bg-indigo-600 text-white rounded-br-none"
                                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                {msg.role === "typing" ? (
                                    <div className="flex items-center space-x-1">
                                        <motion.span
                                            className="w-2 h-2 bg-gray-500 rounded-full"
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: 0,
                                            }}
                                        />
                                        <motion.span
                                            className="w-2 h-2 bg-gray-500 rounded-full"
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: 0.2,
                                            }}
                                        />
                                        <motion.span
                                            className="w-2 h-2 bg-gray-500 rounded-full"
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                delay: 0.4,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    msg.content
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <form
                onSubmit={handleSend}
                className="mt-4 flex items-center border-t border-gray-200 pt-3 gap-2"
            >
                <input
                    type="text"
                    placeholder="Type your query here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 bg-white shadow-sm"
                />
                <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}
