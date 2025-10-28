import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, User, Sparkles, MessageCircle, X } from 'lucide-react';
import { openAIService, ComponentRecommendationRequest } from '../services/openai';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIRecommendationChatProps {
  budget: string;
  currentComponent?: string;
  isOpen: boolean;
  onClose: () => void;
  onRecommendationReceived?: (recommendation: string) => void;
}

export function AIRecommendationChat({ 
  budget, 
  currentComponent, 
  isOpen, 
  onClose,
  onRecommendationReceived 
}: AIRecommendationChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize with welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'assistant',
        content: `Hi! I'm your AI PC building assistant. I see you're working with a $${budget.replace('-', ' - $')} budget${currentComponent ? ` and looking at ${currentComponent} options` : ''}. I can help you find the perfect components that match your needs and budget. What would you like to know?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, budget, currentComponent]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      let response: string;

      // Check if user is asking for component recommendations
      if (currentComponent && (
        inputMessage.toLowerCase().includes('recommend') || 
        inputMessage.toLowerCase().includes('suggest') ||
        inputMessage.toLowerCase().includes('best') ||
        inputMessage.toLowerCase().includes(currentComponent.toLowerCase())
      )) {
        const request: ComponentRecommendationRequest = {
          budget: budget,
          componentType: currentComponent,
          preferences: inputMessage
        };
        response = await openAIService.getComponentRecommendation(request);
      } else {
        response = await openAIService.getChatResponse(inputMessage, { budget, currentComponent });
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (onRecommendationReceived) {
        onRecommendationReceived(response);
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I apologize, but I'm having trouble connecting right now. Please check your API configuration or try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What's the best GPU for my budget?",
    "Recommend a complete build",
    "Compare AMD vs Intel CPUs",
    "What about compatibility?"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-2xl h-[600px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="flex-1 flex flex-col bg-white/95 backdrop-blur-sm border-purple-200 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium">AI PC Builder Assistant</h3>
                  <p className="text-sm text-gray-500">Budget: ${budget.replace('-', ' - $')}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'assistant' && (
                      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-2 flex-shrink-0">
                        <Bot className="w-4 h-4 text-purple-600" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : ''}`}>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                          : 'bg-gray-50 text-gray-900'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-full p-2 flex-shrink-0 order-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full p-2 flex-shrink-0">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
                        <span className="text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-purple-100">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about PC building..."
                  className="flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AIRecommendationChat;