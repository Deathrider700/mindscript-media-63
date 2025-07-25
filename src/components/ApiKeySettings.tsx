import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useApiKey } from '@/contexts/ApiKeyContext';
import { useToast } from '@/hooks/use-toast';
import { Settings, Key, Eye, EyeOff, Save, Trash2 } from 'lucide-react';

export default function ApiKeySettings() {
  const { userApiKey, setUserApiKey } = useApiKey();
  const [inputValue, setInputValue] = useState(userApiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="hover-lift">
          <Settings className="w-4 h-4 mr-2" />
          API Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>API Key Settings</span>
          </DialogTitle>
          <DialogDescription>
            Configure your custom API key. If not set, the default key will be used.
          </DialogDescription>
        </DialogHeader>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Current Status</CardTitle>
            <CardDescription>
              {userApiKey ? (
                <span className="text-accent">Using custom API key: {formatKey(userApiKey)}</span>
              ) : (
                <span className="text-muted-foreground">Using default API key</span>
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
                Your API key is stored locally in your browser and never sent to our servers.
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
  );
}