'use client'

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Sparkles } from "lucide-react";

const glowAnimation = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
        opacity: [0.5, 1, 0.5],
        scale: [1, 1.05, 1],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export default function TherapyPage() {

    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const [messages, setMessages] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const [isChatPaused] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, [])
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            setTimeout(() => {
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    useEffect(() => {
        if (!isTyping) {
            scrollToBottom();
        }
    }, [messages, isTyping]);

    return (
        <div className="relative max-w-7xl mx-auto px-4">
            <div className="flex h-[calc(100vh-4rem)] mt-20 gap-6">
                <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-background rounded-lg border">
                    {/* Chat header */}
                    <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h2 className="font-semibold">AI Therapist</h2>
                                <p className="text-sm text-muted-foreground">
                                    {messages.length} messages
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {messages.length === 0 ? (
                    // Welcome screen with suggested questions
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="max-w-2xl w-full space-y-8">
                            <div className="text-center space-y-4">
                                <div className="relative inline-flex flex-col items-center">
                                    <motion.div
                                        className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                                        initial="initial"
                                        animate="animate"
                                        variants={glowAnimation}
                                    />
                                    <div className="relative flex items-center gap-2 text-2xl font-semibold">
                                        <div className="relative">
                                            <Sparkles className="w-6 h-6 text-primary" />
                                            <motion.div
                                                className="absolute inset-0 text-primary"
                                                initial="initial"
                                                animate="animate"
                                                variants={glowAnimation}
                                            >
                                                <Sparkles className="w-6 h-6" />
                                            </motion.div>
                                        </div>
                                        <span className="bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                                            AI Therapist
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground mt-2">
                                        How can I assist you today?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto scroll-smooth">
                        <div className="max-w-3xl mx-auto">
                            <AnimatePresence initial={false}>

                            </AnimatePresence>
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="px-6 py-8 flex gap-4 bg-muted/30"
                                >
                                    <div className="w-8 h-8 shrink-0">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center ring-1 ring-primary/20">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <p className="font-medium text-sm">AI Therapist</p>
                                        <p className="text-sm text-muted-foreground">Typing...</p>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}

                <div className="border-t bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 p-4">
                    <form
                        // onSubmit={handleSubmit}
                        className="max-w-3xl mx-auto flex gap-4 items-end relative"
                    >
                        <div className="flex-1 relative group">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={
                                    isChatPaused
                                        ? "Complete the activity to continue..."
                                        : "Ask me anything..."
                                }
                                className={cn(
                                    "w-full resize-none rounded-2xl border bg-background",
                                    "p-3 pr-12 min-h-[48px] max-h-[200px]",
                                    "focus:outline-none focus:ring-2 focus:ring-primary/50",
                                    "transition-all duration-200",
                                    "placeholder:text-muted-foreground/70",
                                    (isTyping || isChatPaused) &&
                                    "opacity-50 cursor-not-allowed"
                                )}
                                rows={1}
                                disabled={isTyping || isChatPaused}
                                // onKeyDown={(e) => {
                                //     if (e.key === "Enter" && !e.shiftKey) {
                                //         e.preventDefault();
                                //         handleSubmit(e);
                                //     }
                                // }}
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className={cn(
                                    "absolute right-1.5 bottom-3.5 h-[36px] w-[36px]",
                                    "rounded-xl transition-all duration-200",
                                    "bg-primary hover:bg-primary/90",
                                    "shadow-sm shadow-primary/20",
                                    (isTyping || isChatPaused || !message.trim()) &&
                                    "opacity-50 cursor-not-allowed",
                                    "group-hover:scale-105 group-focus-within:scale-105"
                                )}
                                disabled={isTyping || isChatPaused || !message.trim()}
                                // onClick={(e) => {
                                //     e.preventDefault();
                                //     handleSubmit(e);
                                // }}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>

            </div>
        </div>)
}