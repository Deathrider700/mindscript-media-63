import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useToast } from '@/hooks/use-toast';
import { Key, Eye, EyeOff, AlertCircle, Sparkles } from 'lucide-react';

export default function StartupApiKeyModal() {
  const { userApiKey, setUserApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  // Show modal on startup if no API key is set
  useEffect(() => {
    const hasSeenStartup = localStorage.getItem('has-seen-startup-modal');
    if (!userApiKey && !hasSeenStartup) {
      setIsOpen(true);
    }
  }, [userApiKey]);

  const handleSave = () => {
    if (inputValue.trim()) {
      setUserApiKey(inputValue.trim());
      toast({
        title: "Welcome to AI Studio! 🎉",
        description: "Your API key has been saved. You can now use all AI features.",
      });
      setIsOpen(false);
      localStorage.setItem('has-seen-startup-modal', 'true');
    } else {
      toast({
        title: "Invalid API Key",
        description: "Please enter a valid API key to continue.",
        variant: "destructive"
      });
    }
  };

  const handleSkip = () => {
    setIsOpen(false);
    localStorage.setItem('has-seen-startup-modal', 'true');
    toast({
      title: "API Key Required",
      description: "You can add your API key anytime using the key icon in the header.",
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="glass-card max-w-md">{/* No close button for startup modal */}
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center neural-glow">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Welcome to AI Studio!</DialogTitle>
          <DialogDescription className="text-center">
            To get started with AI features, please add your API key. It's stored securely in your browser.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Quick Setup Required
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Add your API key to unlock AI chat, image generation, video creation, and more.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="startup-api-key">Your API Key</Label>
            <div className="relative">
              <Input
                id="startup-api-key"
                type={showKey ? "text" : "password"}
                placeholder="Enter your API key..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pr-10"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1 h-7 w-7 p-0"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Your API key is encrypted and stored locally. We never see or store it on our servers.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={handleSave} 
              disabled={!inputValue.trim()}
              variant="neural" 
              className="flex-1"
            >
              <Key className="w-4 h-4 mr-2" />
              Save & Continue
            </Button>
            <Button onClick={handleSkip} variant="outline">
              Skip for now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}