import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, Calculator, MessageSquare, FileText, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "CIBIL Predictor",
      description: "AI-powered credit score prediction with personalized improvement suggestions"
    },
    {
      icon: FileText,
      title: "Loan Manager",
      description: "Track and manage all your loans in one secure dashboard"
    },
    {
      icon: Calculator,
      title: "Insurance Calculator",
      description: "Find the perfect insurance coverage with instant premium calculations"
    },
    {
      icon: MessageSquare,
      title: "ChatBot Assistant",
      description: "24/7 AI assistant for loan queries and financial guidance"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djRoNHYtNHptMCA4djRoNHYtNHptLTggOHY0aDR2LTR6bTAgOHY0aDR2LTR6bTggMHY0aDR2LTR6bTggOHY0aDR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                No Payment Required • 100% Free
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-scale-in">
              AI CIBIL Store
              <span className="block text-3xl md:text-4xl font-semibold mt-2 text-white/90">
                Your Loan Eligibility Partner
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Predict your CIBIL score with AI, manage loans intelligently, and find the perfect insurance coverage
            </p>

            {/* Animated Score Gauge */}
            <div className="my-12 animate-float">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-primary">750</div>
                    <div className="text-sm text-muted-foreground">Your Score</div>
                  </div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-success to-primary rounded-full opacity-20 animate-pulse-slow"></div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-xl"
                onClick={() => navigate("/auth")}
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
                onClick={() => navigate("/auth")}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to manage your financial journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-base cursor-pointer group">
                <div className="bg-gradient-card p-4 rounded-lg w-fit mb-4 group-hover:shadow-glow transition-base">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted & Secure</h2>
              <p className="text-xl text-muted-foreground">Your financial data is protected with enterprise-grade security</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Bank-Level Security</h3>
                <p className="text-muted-foreground">256-bit encryption</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto mb-4">
                  <Lock className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Data Privacy</h3>
                <p className="text-muted-foreground">Your data never shared</p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 p-6 rounded-full w-fit mx-auto mb-4">
                  <FileText className="w-12 h-12 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Compliance</h3>
                <p className="text-muted-foreground">RBI guidelines followed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of users managing their loans with AI</p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/auth")}
          >
            Create Free Account <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
