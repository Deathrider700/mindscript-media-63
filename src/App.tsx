import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiKeyProvider } from "./contexts/ApiKeyContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import ImageGenerator from "./pages/ImageGenerator";
import ImageEditor from "./pages/ImageEditor";
import VideoGenerator from "./pages/VideoGenerator";
import TextToSpeech from "./pages/TextToSpeech";
import Transcription from "./pages/Transcription";
import Pricing from "./pages/Pricing";
import Features from "./pages/Features";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApiKeyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/image" element={<ImageGenerator />} />
            <Route path="/image-editor" element={<ImageEditor />} />
            <Route path="/video" element={<VideoGenerator />} />
            <Route path="/tts" element={<TextToSpeech />} />
            <Route path="/transcription" element={<Transcription />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ApiKeyProvider>
  </QueryClientProvider>
);

export default App;
