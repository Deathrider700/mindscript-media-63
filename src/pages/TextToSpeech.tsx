import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateSpeech, AI_MODELS } from '@/lib/api';
import { Volume2, Play, Pause, Download, Loader2 } from 'lucide-react';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS.tts[0]);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];

  const handleGenerate = async () => {
    if (!text.trim() || loading) return;

    setLoading(true);

    try {
      const blob = await generateSpeech({
        model: selectedModel,
        input: text,
        voice: selectedVoice
      });

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      toast({
        title: "Success!",
        description: "Speech generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate speech. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePlayback = () => {
    if (!audioUrl) return;

    if (audio && !audio.paused) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const newAudio = new Audio(audioUrl);
      setAudio(newAudio);
      newAudio.play();
      setIsPlaying(true);
      
      newAudio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;

    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = 'ai-speech.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">Text to Speech</h1>
        <p className="text-muted-foreground text-lg">
          Convert your text into natural-sounding speech using AI voice models
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5" />
              <span>Speech Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Model</label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_MODELS.tts.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Voice</label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice} value={voice}>
                      {voice.charAt(0).toUpperCase() + voice.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Text</label>
              <Textarea
                placeholder="Enter the text you want to convert to speech..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[200px]"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={!text.trim() || loading}
              variant="neural"
              size="lg"
              className="w-full"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Volume2 className="w-4 h-4 mr-2" />
              )}
              Generate Speech
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Audio Player</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {audioUrl ? (
              <div className="space-y-4">
                <div className="bg-muted rounded-lg p-6 text-center">
                  <Volume2 className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-sm text-muted-foreground mb-4">Audio generated successfully</p>
                  
                  <div className="flex justify-center space-x-2">
                    <Button
                      onClick={togglePlayback}
                      variant="neural"
                      size="sm"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 mr-2" />
                      ) : (
                        <Play className="w-4 h-4 mr-2" />
                      )}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      onClick={downloadAudio}
                      variant="outline"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <Volume2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Generated audio will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}