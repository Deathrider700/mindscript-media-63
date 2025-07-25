import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ApiKeySettings from './ApiKeySettings';
import { 
  MessageSquare, 
  Image, 
  Video, 
  Volume2, 
  Mic, 
  Home,
  Sparkles,
  X,
  CreditCard,
  Info,
  Zap,
  Edit3
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/features', icon: Zap },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Image Gen', href: '/image', icon: Image },
  { name: 'Image Edit', href: '/image-editor', icon: Edit3 },
  { name: 'Video Gen', href: '/video', icon: Video },
  { name: 'Text to Speech', href: '/tts', icon: Volume2 },
  { name: 'Transcription', href: '/transcription', icon: Mic },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'About', href: '/about', icon: Info },
];

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const location = useLocation();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Mobile Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-80 bg-background/95 backdrop-blur-xl border-l border-border/40 z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/40">
            <Link to="/" className="flex items-center space-x-2" onClick={onClose}>
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                AI Studio
              </span>
            </Link>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {navigation.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link 
                    key={item.name} 
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      "block animate-slide-in",
                      "animation-delay-" + (index * 50)
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Button
                      variant={isActive ? "neural" : "ghost"}
                      className={cn(
                        "w-full justify-start space-x-3 h-12 text-left",
                        isActive && "neural-glow"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border/40 space-y-4">
            {/* API Settings for mobile */}
            <div className="w-full">
              <ApiKeySettings />
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Powered by Advanced AI
              </p>
              <Button variant="neural" size="lg" className="w-full">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}