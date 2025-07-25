import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { sendChatMessage, AI_MODELS, type ChatMessage } from '@/lib/api';
import { Send, Bot, User, Loader2, Download, Trash2, Copy, RefreshCw } from 'lucide-react';

const SYSTEM_PROMPTS = [
  { name: 'Default Assistant', prompt: 'You are a helpful AI assistant.' },
  { name: 'Creative Writer', prompt: 'You are a creative writing assistant. Help users craft engaging stories, poems, and creative content.' },
  { name: 'Code Helper', prompt: 'You are a programming assistant. Help users with coding questions, debugging, and software development.' },
  { name: 'Business Advisor', prompt: 'You are a business consultant. Provide strategic advice, market insights, and business solutions.' },
  { name: 'Teacher', prompt: 'You are an educational tutor. Explain concepts clearly and help users learn new topics.' },
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: 'You are a helpful AI assistant.' }
  ]);
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS.chat[0]);
  const [selectedPrompt, setSelectedPrompt] = useState(SYSTEM_PROMPTS[0]);
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clearChat = () => {
    setMessages([{ role: 'system', content: selectedPrompt.prompt }]);
    toast({
      title: "Chat cleared",
      description: "Conversation history has been cleared.",
    });
  };

  const exportChat = () => {
    const chatHistory = messages
      .filter(m => m.role !== 'system')
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');
    
    const blob = new Blob([chatHistory], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied",
      description: "Message copied to clipboard.",
    });
  };

  const regenerateResponse = async (messageIndex: number) => {
    if (loading) return;
    
    const conversationUpToIndex = messages.slice(0, messageIndex);
    setLoading(true);

    try {
      const response = await sendChatMessage({
        model: selectedModel,
        messages: conversationUpToIndex,
        temperature,
        max_tokens: 1000
      });

      const newAssistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      const updatedMessages = [...conversationUpToIndex, newAssistantMessage];
      setMessages(updatedMessages);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await sendChatMessage({
        model: selectedModel,
        messages: newMessages,
        temperature: 0.7,
        max_tokens: 1000
      });

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response.choices[0].message.content
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-10rem)]">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold gradient-text">AI Chat Assistant</h1>
        <p className="text-muted-foreground text-xl">
          Experience next-generation AI conversation with advanced language models
        </p>
      </div>

      {/* Model & Controls Section */}
      <div className="grid lg:grid-cols-4 gap-4">
        <Card className="glass-card lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Bot className="w-5 h-5" />
              <span>AI Model</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {AI_MODELS.chat.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <RefreshCw className="w-5 h-5" />
              <span>Temperature</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={temperature.toString()} onValueChange={(v) => setTemperature(parseFloat(v))}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">0.1 - Focused</SelectItem>
                <SelectItem value="0.5">0.5 - Balanced</SelectItem>
                <SelectItem value="0.7">0.7 - Creative</SelectItem>
                <SelectItem value="1.0">1.0 - Very Creative</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              onClick={clearChat} 
              variant="outline" 
              size="sm" 
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button 
              onClick={exportChat} 
              variant="outline" 
              size="sm" 
              className="w-full"
              disabled={messages.filter(m => m.role !== 'system').length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="grid lg:grid-cols-1 gap-6 h-full">
        <Card className="glass-card h-full flex flex-col">
          <CardHeader className="border-b border-border/40 bg-background/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-6 h-6" />
                <span>Conversation</span>
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {messages.filter(m => m.role !== 'system').length} messages
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.filter(m => m.role !== 'system').length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 opacity-60">
                    <Bot className="w-16 h-16 mx-auto text-muted-foreground" />
                    <p className="text-xl font-medium text-muted-foreground">
                      Start a conversation with AI
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Ask questions, request explanations, or get help with any task. 
                      The AI is here to assist you.
                    </p>
                  </div>
                </div>
              ) : (
                messages.filter(m => m.role !== 'system').map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 group animate-fade-in ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center neural-glow shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`relative max-w-2xl px-6 py-4 rounded-2xl shadow-lg hover-lift ${
                        message.role === 'user'
                          ? 'bg-gradient-primary text-white ml-12'
                          : 'bg-background/80 backdrop-blur-sm border border-border/40 mr-12'
                      }`}
                    >
                      <p className="text-base leading-relaxed whitespace-pre-wrap">
                        {message.content}
                      </p>
                      
                      {/* Message Actions */}
                      <div className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          <Button
                            onClick={() => copyMessage(message.content)}
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          {message.role === 'assistant' && (
                            <Button
                              onClick={() => regenerateResponse(index + 1)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                              disabled={loading}
                            >
                              <RefreshCw className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))
              )}
              
              {/* Loading Indicator */}
              {loading && (
                <div className="flex items-start space-x-4 animate-fade-in">
                  <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center neural-glow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-background/80 backdrop-blur-sm border border-border/40 px-6 py-4 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="border-t border-border/40 bg-background/50 backdrop-blur-sm p-6">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Textarea
                    placeholder="Ask me anything... (Press Enter to send, Shift+Enter for new line)"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    className="min-h-[80px] text-base resize-none border-2 focus:border-primary/50 bg-background/80 backdrop-blur-sm"
                    disabled={loading}
                  />
                </div>
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || loading}
                  variant="neural"
                  size="lg"
                  className="px-8 neural-glow shrink-0"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}