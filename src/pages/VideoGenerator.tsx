import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { generateVideo, AI_MODELS } from '@/lib/api';
import { Video as VideoIcon, Play, Download, Loader2 } from 'lucide-react';

export default function VideoGenerator() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS.video[0]);
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [selectedQuality, setSelectedQuality] = useState('480p');
  const [selectedDuration, setSelectedDuration] = useState(4);
  const [loading, setLoading] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<string[]>([]);
  const { toast } = useToast();

  const aspectRatios = ['16:9', '9:16', '1:1'];
  const qualities = ['480p', '720p', '1080p'];
  const durations = [2, 4, 6, 8, 10];

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);

    try {
      const response = await generateVideo({
        model: selectedModel,
        prompt,
        ratio: selectedRatio,
        quality: selectedQuality,
        duration: selectedDuration
      });

      if (response.data && response.data.length > 0) {
        const videoUrls = response.data.map((item: any) => item.url);
        setGeneratedVideos(prev => [...videoUrls, ...prev]);
        
        toast({
          title: "Success!",
          description: "Video generated successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async (url: string, index: number) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `ai-generated-video-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download video.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">AI Video Generator</h1>
        <p className="text-muted-foreground text-lg">
          Create amazing videos from text descriptions using cutting-edge AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Video Settings</span>
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
                    {AI_MODELS.video.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Aspect Ratio</label>
                <Select value={selectedRatio} onValueChange={setSelectedRatio}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatios.map((ratio) => (
                      <SelectItem key={ratio} value={ratio}>
                        {ratio}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Quality</label>
                <Select value={selectedQuality} onValueChange={setSelectedQuality}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qualities.map((quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Duration (seconds)</label>
                <Select value={selectedDuration.toString()} onValueChange={(value) => setSelectedDuration(parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration} value={duration.toString()}>
                        {duration}s
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Prompt</label>
                <Textarea
                  placeholder="Describe the video you want to generate..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || loading}
                variant="neural"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <VideoIcon className="w-4 h-4 mr-2" />
                )}
                Generate Video
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Generated Videos</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedVideos.length > 0 ? (
                <div className="grid gap-4">
                  {generatedVideos.map((url, index) => (
                    <div key={index} className="relative group">
                      <video
                        src={url}
                        controls
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="mt-2 flex justify-end">
                        <Button
                          onClick={() => downloadVideo(url, index)}
                          variant="neural"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <VideoIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generated videos will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}