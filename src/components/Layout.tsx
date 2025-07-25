import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import MobileNavigation from './MobileNavigation';
import ApiKeySettings from './ApiKeySettings';
import { 
  MessageSquare, 
  Image, 
  Video, 
  Volume2, 
  Mic, 
  Home,
  Sparkles,
  Menu,
  CreditCard,
  Info,
  Zap
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Features', href: '/features', icon: Zap },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare },
  { name: 'Image Gen', href: '/image', icon: Image },
  { name: 'Video Gen', href: '/video', icon: Video },
  { name: 'Text to Speech', href: '/tts', icon: Volume2 },
  { name: 'Transcription', href: '/transcription', icon: Mic },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'About', href: '/about', icon: Info },
];

const primaryNav = navigation.slice(0, 6); // Main tools
const secondaryNav = navigation.slice(6); // Additional pages

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-xl sticky top-0 z-40 glass-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 hover-scale">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center neural-glow">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                AI Studio
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {primaryNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link key={item.name} to={item.href}>
                      <Button
                        variant={isActive ? "neural" : "ghost"}
                        size="sm"
                        className={cn(
                          "flex items-center space-x-2 hover-lift",
                          isActive && "neural-glow"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
                
                {/* Secondary Navigation */}
                <div className="mx-2 w-px h-6 bg-border"></div>
                {secondaryNav.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link key={item.name} to={item.href}>
                      <Button
                        variant={isActive ? "neural" : "ghost"}
                        size="sm"
                        className={cn(
                          "flex items-center space-x-2 hover-lift",
                          isActive && "neural-glow"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Button>
                    </Link>
                  );
                })}
              </nav>

              {/* API Settings for desktop */}
              <div className="hidden lg:block">
                <ApiKeySettings />
              </div>

              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover-scale"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">AI Studio</span>
              </Link>
              <p className="text-muted-foreground text-sm">
                Democratizing AI tools for creators, professionals, and teams worldwide.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">AI Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/chat" className="hover:text-foreground transition-colors">AI Chat</Link></li>
                <li><Link to="/image" className="hover:text-foreground transition-colors">Image Generator</Link></li>
                <li><Link to="/video" className="hover:text-foreground transition-colors">Video Creator</Link></li>
                <li><Link to="/tts" className="hover:text-foreground transition-colors">Text to Speech</Link></li>
                <li><Link to="/transcription" className="hover:text-foreground transition-colors">Transcription</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 AI Studio. All rights reserved. Built with ❤️ for creators.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}