const API_BASE_URL = 'https://api.a4f.co/v1';

// Get API key from user's localStorage - throws error if not found
const getApiKey = () => {
  const userKey = localStorage.getItem('user-api-key');
  if (!userKey) {
    throw new Error('API key required. Please set your API key in the settings.');
  }
  return userKey;
};

const getHeaders = () => ({
  'Authorization': `Bearer ${getApiKey()}`,
  'Content-Type': 'application/json',
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface ImageRequest {
  model: string;
  prompt: string;
  n?: number;
  size?: string;
}

export interface VideoRequest {
  model: string;
  prompt: string;
  ratio?: string;
  quality?: string;
  duration?: number;
}

export interface TTSRequest {
  model: string;
  input: string;
  voice?: string;
}

export interface ImageEditRequest {
  image: File;
  prompt: string;
  model: string;
}

// Chat API
export const sendChatMessage = async (request: ChatRequest) => {
  const response = await fetch(`${API_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`Chat API error: ${response.statusText}`);
  }
  
  return response.json();
};

// Image Generation API
export const generateImage = async (request: ImageRequest) => {
  const response = await fetch(`${API_BASE_URL}/images/generations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`Image generation error: ${response.statusText}`);
  }
  
  return response.json();
};

// Video Generation API
export const generateVideo = async (request: VideoRequest) => {
  const response = await fetch(`${API_BASE_URL}/video/generations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`Video generation error: ${response.statusText}`);
  }
  
  return response.json();
};

// Text to Speech API
export const generateSpeech = async (request: TTSRequest) => {
  const response = await fetch(`${API_BASE_URL}/audio/speech`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(request),
  });
  
  if (!response.ok) {
    throw new Error(`TTS error: ${response.statusText}`);
  }
  
  return response.blob();
};

// Image Edit API
export const editImage = async (request: ImageEditRequest) => {
  const formData = new FormData();
  formData.append('image', request.image);
  formData.append('prompt', request.prompt);
  formData.append('model', request.model);
  
  const response = await fetch(`${API_BASE_URL}/images/edits`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Image edit error: ${response.statusText}`);
  }
  
  return response.json();
};

// Audio Transcription API
export const transcribeAudio = async (file: File, model: string = 'provider-3/whisper-1') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', model);
  
  const response = await fetch(`${API_BASE_URL}/audio/transcriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getApiKey()}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error(`Transcription error: ${response.statusText}`);
  }
  
  return response.json();
};

// Model configurations
export const AI_MODELS = {
  chat: [
    'provider-3/gpt-4',
    'provider-3/gpt-4.1-mini',
    'provider-6/gpt-4.1-mini',
    'provider-6/gpt-4.1-nano',
    'provider-3/gpt-4.1-nano',
    'provider-6/gpt-4o-mini-search-preview',
    'provider-3/gpt-4o-mini-search-preview',
    'provider-6/gpt-4o',
    'provider-6/o3-medium',
    'provider-6/o3-high',
    'provider-6/o3-low',
    'provider-6/gpt-4.1',
    'provider-6/o4-mini-medium',
    'provider-6/o4-mini-high',
    'provider-6/o4-mini-low',
    'provider-1/gemini-2.5-pro',
    'provider-3/deepseek-v3',
    'provider-1/deepseek-v3-0324',
    'provider-1/sonar',
    'provider-1/sonar-deep-research',
    'provider-2/mistral-small',
    'provider-6/minimax-m1-40k',
    'provider-6/kimi-k2',
    'provider-3/kimi-k2',
    'provider-6/qwen3-coder-480b-a35b',
    'provider-3/llama-3.1-405b',
    'provider-3/qwen-3-235b-a22b-2507',
    'provider-1/mistral-large',
    'provider-2/llama-4-scout',
    'provider-2/llama-4-maverick',
    'provider-6/gemini-2.5-flash-thinking',
    'provider-6/gemini-2.5-flash',
    'provider-1/gemma-3-12b-it',
    'provider-1/llama-3.3-70b-instruct-turbo'
  ],
  image: [
    'provider-4/imagen-3',
    'provider-4/imagen-4',
    'provider-6/sana-1.5-flash',
    'provider-1/FLUX.1-schnell',
    'provider-2/FLUX.1-schnell',
    'provider-3/FLUX.1-schnell',
    'provider-6/sana-1.5',
    'provider-3/FLUX.1-dev',
    'provider-6/FLUX.1-dev',
    'provider-1/FLUX.1.1-pro',
    'provider-6/FLUX.1-pro',
    'provider-1/FLUX.1-kontext-pro',
    'provider-6/FLUX.1-kontext-pro',
    'provider-6/FLUX.1-1-pro',
    'provider-6/FLUX.1-kontext-dev',
    'provider-2/FLUX.1-schnell-v2',
    'provider-6/FLUX.1-kontext-max'
  ],
  video: [
    'provider-6/wan-2.1'
  ],
  tts: [
    'provider-3/tts-1',
    'provider-6/sonic-2',
    'provider-6/sonic'
  ],
  transcription: [
    'provider-2/whisper-1',
    'provider-3/whisper-1',
    'provider-6/distil-whisper-large-v3-en',
    'provider-3/gpt-4o-mini-transcribe'
  ],
  imageEdit: [
    'provider-6/black-forest-labs-flux-1-kontext-dev',
    'provider-6/black-forest-labs-flux-1-kontext-pro',
    'provider-6/black-forest-labs-flux-1-kontext-max',
    'provider-3/flux-kontext-dev'
  ]
};