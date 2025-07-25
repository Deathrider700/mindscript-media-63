import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: string;
}

export default function ToolCard({ title, description, icon: Icon, href, gradient = "bg-gradient-primary" }: ToolCardProps) {
  return (
    <Card className="glass-card neural-glow group cursor-pointer">
      <CardHeader className="pb-4">
        <div className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Link to={href}>
          <Button variant="neural" size="lg" className="w-full">
            Get Started
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}