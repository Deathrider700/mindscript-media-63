import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Users, 
  Target, 
  Heart,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Award,
  Rocket,
  Code,
  Palette
} from 'lucide-react';

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & CEO',
    image: '/api/placeholder/150/150',
    bio: 'Former AI researcher at OpenAI with 10+ years in machine learning.',
    icon: Rocket
  },
  {
    name: 'Sarah Johnson',
    role: 'Head of Product',
    image: '/api/placeholder/150/150', 
    bio: 'Product leader who scaled AI products for millions of users.',
    icon: Target
  },
  {
    name: 'David Kim',
    role: 'Lead Engineer',
    image: '/api/placeholder/150/150',
    bio: 'Full-stack engineer passionate about building AI infrastructure.',
    icon: Code
  },
  {
    name: 'Emma Wilson',
    role: 'Head of Design',
    image: '/api/placeholder/150/150',
    bio: 'Design leader focused on making AI accessible and beautiful.',
    icon: Palette
  }
];

const values = [
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We push the boundaries of what\'s possible with AI technology.',
    gradient: 'bg-gradient-primary'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in building tools that bring people together.',
    gradient: 'bg-gradient-secondary'
  },
  {
    icon: Target,
    title: 'Quality',
    description: 'We never compromise on the quality of our AI models and user experience.',
    gradient: 'bg-gradient-accent'
  },
  {
    icon: Heart,
    title: 'Accessibility',
    description: 'AI should be available to everyone, regardless of technical background.',
    gradient: 'bg-gradient-primary'
  }
];

const milestones = [
  {
    year: '2023',
    title: 'AI Studio Founded',
    description: 'Started with a vision to democratize AI tools for creators.'
  },
  {
    year: '2024',
    title: '100K+ Users',
    description: 'Reached our first major milestone with creators worldwide.'
  },
  {
    year: '2024',
    title: 'Enterprise Launch',
    description: 'Launched enterprise features for teams and businesses.'
  },
  {
    year: '2024',
    title: 'Global Expansion',
    description: 'Expanded to serve users in over 50 countries.'
  }
];

export default function About() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full animate-fade-in">
          <Heart className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Our Story</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-in-up">
          <span className="gradient-text">Building the Future</span>
          <br />
          <span className="text-foreground">of AI Creation</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          We're a team of AI researchers, engineers, and designers passionate about 
          making artificial intelligence accessible to everyone. Our mission is to 
          democratize AI tools and empower creators worldwide.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="glass-card neural-glow animate-scale-in">
          <CardContent className="p-12 text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To make AI technology accessible, intuitive, and powerful for creators, 
              businesses, and individuals. We believe that everyone should have access 
              to cutting-edge AI tools without needing a PhD in machine learning.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Values Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Our Values</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            The principles that guide everything we do.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={value.title}
                className="glass-card neural-glow animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 ${value.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Meet Our Team</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            The brilliant minds behind AI Studio.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => {
            const Icon = member.icon;
            return (
              <Card 
                key={member.name}
                className="glass-card neural-glow animate-slide-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Our Journey</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            Key milestones in our mission to democratize AI.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 animate-slide-in-right"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <Badge variant="secondary">{milestone.year}</Badge>
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Get in Touch</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="glass-card neural-glow text-center animate-scale-in">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-muted-foreground text-sm">hello@aistudio.com</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card neural-glow text-center animate-scale-in animation-delay-100">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Visit Us</h3>
              <p className="text-muted-foreground text-sm">San Francisco, CA</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card neural-glow text-center animate-scale-in animation-delay-200">
            <CardContent className="p-8 space-y-4">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold">Schedule a Call</h3>
              <p className="text-muted-foreground text-sm">Book a meeting</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-16">
        <h2 className="text-3xl font-bold animate-fade-in">Join Our Mission</h2>
        <p className="text-muted-foreground animate-fade-in animation-delay-100">
          Be part of the AI revolution and help us build the future of creative tools.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in animation-delay-200">
          <Button variant="neural" size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Start Creating
          </Button>
          <Button variant="outline" size="lg">
            Join Our Team
          </Button>
        </div>
      </div>
    </div>
  );
}