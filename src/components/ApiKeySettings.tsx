import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useToast } from '@/hooks/use-toast';
import { Settings, Key, Eye, EyeOff, Save, Trash2, AlertCircle } from 'lucide-react';

export default function ApiKeySettings() {
  const { userApiKey, setUserApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState(userApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const { toast } = useToast();

  // Show popup instructions when no API key is set
  useEffect(() => {
    if (!userApiKey) {
      setShowPopup(true);
    }
  }, [userApiKey]);

  const handleSave = () => {
    if (inputValue.trim()) {
      setUserApiKey(inputValue.trim());
      toast({
        title: "API Key Saved",
        description: "Your custom API key has been saved successfully.",
      });
    } else {
      setUserApiKey(null);
      toast({
        title: "API Key Removed",
        description: "Using default API key now.",
      });
    }
    setIsOpen(false);
  };

  const handleRemove = () => {
    setUserApiKey(null);
    setInputValue('');
    toast({
      title: "API Key Removed",
      description: "Your custom API key has been removed. Using default key now.",
    });
  };

  const formatKey = (key: string) => {
    if (key.length <= 8) return key;
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  return (
    <>
      <Popover open={showPopup} onOpenChange={setShowPopup}>
        <PopoverTrigger asChild>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button 
                variant={userApiKey ? "ghost" : "outline"} 
                size="sm" 
                className={`hover-lift ${!userApiKey ? 'border-destructive text-destructive animate-pulse' : ''}`}
              >
                <Key className="w-4 h-4 mr-2" />
                API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Key className="w-5 h-5" />
                  <span>API Key Settings</span>
                </DialogTitle>
                <DialogDescription>
                  Add your API key to use all AI features. Your key is stored securely in your browser.
                </DialogDescription>
              </DialogHeader>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Current Status</CardTitle>
                  <CardDescription>
                    {userApiKey ? (
                      <span className="text-accent">✓ API key configured: {formatKey(userApiKey)}</span>
                    ) : (
                      <span className="text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        No API key set - AI features disabled
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-key">Your API Key</Label>
                    <div className="relative">
                      <Input
                        id="api-key"
                        type={showKey ? "text" : "password"}
                        placeholder="Enter your API key..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="pr-10"
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
                      Your API key is stored locally and never shared with our servers.
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleSave} variant="neural" className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Key
                    </Button>
                    {userApiKey && (
                      <Button onClick={handleRemove} variant="outline" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="bottom" align="end">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h4 className="font-semibold text-sm">API Key Required</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              To use AI features, click the key icon and add your API key. It's stored securely in your browser.
            </p>
            <Button 
              size="sm" 
              variant="neural" 
              className="w-full"
              onClick={() => {
                setShowPopup(false);
                setIsOpen(true);
              }}
            >
              Add API Key
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}