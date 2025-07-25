import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { editImage, AI_MODELS } from '@/lib/api';
import { Edit3, Upload, Wand2, Download, Loader2 } from 'lucide-react';

export default function ImageEditor() {
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS.imageEdit[0]);
  const [loading, setLoading] = useState(false);
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [editedImageUrl, setEditedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setOriginalImage(file);
      const url = URL.createObjectURL(file);
      setOriginalImageUrl(url);
      setEditedImageUrl(''); // Clear previous edit
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !prompt.trim() || loading) return;

    setLoading(true);

    try {
      const response = await editImage({
        image: originalImage,
        prompt,
        model: selectedModel
      });

      const imageUrl = response.data[0]?.url;
      if (imageUrl) {
        setEditedImageUrl(imageUrl);
        toast({
          title: "Success!",
          description: "Image edited successfully!",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to edit image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download image.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold gradient-text">AI Image Editor</h1>
        <p className="text-muted-foreground text-lg">
          Upload an image and use AI to edit it with text descriptions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5" />
                <span>Edit Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Image</label>
                <div className="space-y-2">
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {originalImage ? 'Change Image' : 'Upload Image'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {originalImage && (
                    <p className="text-sm text-muted-foreground">
                      {originalImage.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AI_MODELS.imageEdit.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Edit Prompt</label>
                <Textarea
                  placeholder="Describe how you want to edit the image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <Button 
                onClick={handleEdit} 
                disabled={!originalImage || !prompt.trim() || loading}
                variant="neural"
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Wand2 className="w-4 h-4 mr-2" />
                )}
                Edit Image
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {originalImageUrl && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Original Image</h3>
                    <div className="relative group">
                      <img
                        src={originalImageUrl}
                        alt="Original image"
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}

                {editedImageUrl && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Edited Image</h3>
                    <div className="relative group">
                      <img
                        src={editedImageUrl}
                        alt="Edited image"
                        className="w-full rounded-lg shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button
                          onClick={() => downloadImage(editedImageUrl, 'edited-image.png')}
                          variant="neural"
                          size="sm"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {!originalImageUrl && (
                  <div className="text-center text-muted-foreground py-12">
                    <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Upload an image to get started</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}