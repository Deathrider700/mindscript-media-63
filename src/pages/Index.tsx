import ToolCard from '@/components/ToolCard';
import ApiKeySettings from '@/components/ApiKeySettings';
import { MessageSquare, Image, Video, Volume2, Mic, Sparkles, Zap, Edit3 } from 'lucide-react';

const tools = [
  {
    title: 'AI Chat',
    description: 'Converse with advanced AI models for assistance, creative writing, and problem-solving',
    icon: MessageSquare,
    href: '/chat',
    gradient: 'bg-gradient-primary'
  },
  {
    title: 'Image Generator',
    description: 'Create stunning images from text descriptions using state-of-the-art AI models',
    icon: Image,
    href: '/image',
    gradient: 'bg-gradient-secondary'
  },
  {
    title: 'Image Editor',
    description: 'Edit and enhance existing images using AI-powered editing tools',
    icon: Edit3,
    href: '/image-editor',
    gradient: 'bg-gradient-accent'
  },
  {
    title: 'Video Generator',
    description: 'Generate cinematic videos from text prompts with AI-powered video synthesis',
    icon: Video,
    href: '/video',
    gradient: 'bg-gradient-accent'
  },
  {
    title: 'Text to Speech',
    description: 'Convert text into natural-sounding speech with multiple voice options',
    icon: Volume2,
    href: '/tts',
    gradient: 'bg-gradient-primary'
  },
  {
    title: 'Audio Transcription',
    description: 'Transcribe audio files to text with high accuracy using whisper models',
    icon: Mic,
    href: '/transcription',
    gradient: 'bg-gradient-secondary'
  }
];

const Index = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Powered by Advanced AI</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          <span className="gradient-text">AI Studio</span>
          <br />
          <span className="text-foreground">Creative Toolkit</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Unlock the power of artificial intelligence with our comprehensive suite of AI tools. 
          Create, communicate, and innovate like never before.
        </p>
        
        {/* API Key Setup */}
        <div className="flex justify-center">
          <ApiKeySettings />
        </div>
        
        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Zap className="w-4 h-4 text-accent" />
            <span>Lightning Fast</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center space-x-1">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Premium Models</span>
          </div>
          <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
          <span>No Limits</span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div key={tool.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <ToolCard {...tool} />
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="text-center space-y-8 pt-12">
        <h2 className="text-3xl font-bold">Why Choose AI Studio?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Blazing Fast</h3>
            <p className="text-muted-foreground">
              Get results in seconds with our optimized AI infrastructure
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Premium Quality</h3>
            <p className="text-muted-foreground">
              Access to the latest and most advanced AI models available
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold">Easy to Use</h3>
            <p className="text-muted-foreground">
              Intuitive interface designed for creators of all skill levels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
