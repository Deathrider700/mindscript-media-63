import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for getting started with AI tools',
    icon: Zap,
    features: [
      '10 AI chat messages per day',
      '3 image generations per day',
      'Basic text-to-speech',
      'Audio transcription (5 mins)',
      'Community support'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
    popular: false
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For creators and professionals',
    icon: Sparkles,
    features: [
      'Unlimited AI chat messages',
      '100 image generations per day',
      'Premium voice models',
      'Video generation (10 per day)',
      'Extended audio transcription',
      'Priority support',
      'Advanced model access'
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'neural' as const,
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For teams and businesses',
    icon: Crown,
    features: [
      'Everything in Pro',
      'Unlimited video generation',
      'Custom model training',
      'API access',
      'Team collaboration',
      'White-label options',
      'Dedicated support',
      'Custom integrations'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'gradient' as const,
    popular: false
  }
];

const faqs = [
  {
    question: 'What AI models do you support?',
    answer: 'We support the latest models from OpenAI, Anthropic, Google, and other leading providers including GPT-4, Claude, Gemini, and specialized models for each use case.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.'
  },
  {
    question: 'Do you offer API access?',
    answer: 'API access is available with our Enterprise plan. Contact our sales team to discuss your specific requirements and integration needs.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans come with a 7-day free trial. No credit card required to start.'
  }
];

export default function Pricing() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Simple, Transparent Pricing</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold leading-tight animate-slide-in-up">
          <span className="gradient-text">Choose Your</span>
          <br />
          <span className="text-foreground">AI Journey</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in animation-delay-200">
          Start free and scale as you grow. No hidden fees, no surprises. 
          Just powerful AI tools at your fingertips.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <Card 
              key={plan.name} 
              className={cn(
                "glass-card relative overflow-hidden group animate-scale-in",
                plan.popular && "ring-2 ring-primary neural-glow"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-primary text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={cn("text-center", plan.popular && "pt-12")}>
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    plan.name === 'Starter' && "bg-gradient-secondary",
                    plan.name === 'Pro' && "bg-gradient-primary", 
                    plan.name === 'Enterprise' && "bg-gradient-accent"
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={feature} 
                      className="flex items-start space-x-3 animate-slide-in-right"
                      style={{ animationDelay: `${(index * 150) + (featureIndex * 50)}ms` }}
                    >
                      <div className="w-5 h-5 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={plan.buttonVariant}
                  size="lg" 
                  className="w-full group-hover:shadow-glow transition-all duration-300"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold animate-fade-in">Frequently Asked Questions</h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-100">
            Got questions? We've got answers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className="glass-card neural-glow animate-slide-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-16">
        <h2 className="text-3xl font-bold animate-fade-in">Ready to Get Started?</h2>
        <p className="text-muted-foreground animate-fade-in animation-delay-100">
          Join thousands of creators already using AI Studio
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in animation-delay-200">
          <Button variant="neural" size="lg">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}