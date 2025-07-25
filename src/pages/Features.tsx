import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Image, 
  Video, 
  Volume2, 
  Mic, 
  Sparkles, 
  Zap,
  Shield,
  Globe,
  Clock,
  Users,
  BarChart3,
  Palette
} from 'lucide-react';

const features = [
  {
    category: 'AI Chat',
    icon: MessageSquare,
    gradient: 'bg-gradient-primary',
    items: [
      'Multiple AI Models (GPT-4, Claude, Gemini)',
      'Conversation Memory & Context',
      'Custom System Prompts',
      'Export Chat History',
      'Real-time Streaming Responses',
      'Multi-language Support'
    ]
  },
  {
    category: 'Image Generation',
    icon: Image,
    gradient: 'bg-gradient-secondary',
    items: [
      'FLUX, DALL-E, Midjourney Models',
      'Multiple Aspect Ratios',
      'High Resolution Output',
      'Batch Generation',
      'Style Presets',
      'Image Enhancement'
    ]
  },
  {
    category: 'Video Creation',
    icon: Video,
    gradient: 'bg-gradient-accent',
    items: [
      'Text-to-Video Generation',
      'Multiple Quality Options',
      'Custom Aspect Ratios',
      'Duration Control',
      'Scene Transitions',
      'Background Music Integration'
    ]
  },
  {
    category: 'Voice & Audio',
    icon: Volume2,
    gradient: 'bg-gradient-primary',
    items: [
      'Natural Voice Synthesis',
      'Multiple Voice Options',
      'Audio Transcription',
      'Real-time Processing',
      'High-Quality Output',
      'Multi-format Support'
    ]
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized infrastructure delivers results in seconds, not minutes.',
    gradient: 'bg-gradient-primary'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Enterprise-grade security with end-to-end encryption for all data.',
    gradient: 'bg-gradient-secondary'
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Available worldwide with 99.9% uptime and global CDN delivery.',
    gradient: 'bg-gradient-accent'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock access to AI tools whenever inspiration strikes.',
    gradient: 'bg-gradient-primary'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Share projects and collaborate with team members seamlessly.',
    gradient: 'bg-gradient-secondary'
  },
  {
    icon: BarChart3,
    title: 'Usage Analytics',
    description: 'Detailed insights and analytics to track your AI usage and productivity.',
    gradient: 'bg-gradient-accent'
  }
];

const useCases = [
  {
    title: 'Content Creators',
    description: 'Generate thumbnails, scripts, voiceovers, and promotional videos for your content.',
    icon: Palette,
    examples: ['YouTube thumbnails', 'Podcast transcripts', 'Social media content', 'Video scripts']
  },
  {
    title: 'Businesses',
    description: 'Create marketing materials, presentations, and customer support content.',
    icon: BarChart3,
    examples: ['Marketing copy', 'Product images', 'Training videos', 'Customer support']
  },
  {
    title: 'Developers',
    description: 'Generate code documentation, API examples, and technical content.',
    icon: Zap,
    examples: ['Code documentation', 'Tutorial videos', 'API examples', 'Technical blogs']
  },
  {
    title: 'Educators',
    description: 'Create educational content, presentations, and interactive learning materials.',
    icon: Users,
    examples: ['Course materials', 'Educational videos', 'Interactive content', 'Student assessments']
  }
];

export default function Features() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Comprehensive AI Features</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-in-up">
          <span className="gradient-text">Everything You Need</span>
          <br />
          <span className="text-foreground">In One Platform</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          Discover the full potential of AI with our comprehensive suite of tools. 
          From creative content to business automation, we've got you covered.
        </p>
      </div>

      {/* Feature Categories */}
      <div className="space-y-16">
        {features.map((category, categoryIndex) => {
          const Icon = category.icon;
          return (
            <div 
              key={category.category} 
              className="animate-slide-in-up"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="text-center mb-12">
                <div className={`w-16 h-16 ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 neural-glow`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{category.category}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <Card 
                    key={item}
                    className="glass-card neural-glow animate-scale-in"
                    style={{ animationDelay: `${(categoryIndex * 200) + (itemIndex * 100)}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-lg mb-2">{item}</h3>
                      <div className="w-8 h-1 bg-gradient-primary rounded-full mx-auto"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Why Choose AI Studio?</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            Built for creators, professionals, and teams who demand the best.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={benefit.title}
                className="glass-card neural-glow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${benefit.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Perfect For Every Use Case</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            See how AI Studio transforms workflows across industries.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <Card 
                key={useCase.title}
                className="glass-card neural-glow animate-slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {useCase.examples.map((example) => (
                      <Badge key={example} variant="secondary" className="text-xs">
                        {example}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-16">
        <h2 className="text-3xl font-bold animate-fade-in">Ready to Experience the Future?</h2>
        <p className="text-muted-foreground animate-fade-in animation-delay-100">
          Join the AI revolution and transform your creative workflow today.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in animation-delay-200">
          <Button variant="neural" size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Creating Now
          </Button>
          <Button variant="outline" size="lg">
            View Live Demo
          </Button>
        </div>
      </div>
    </div>
  );
}