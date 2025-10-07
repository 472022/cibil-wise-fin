import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  FileText, 
  Calculator, 
  MessageSquare, 
  Video, 
  Headphones, 
  FolderOpen,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: "Active Loans", value: "3", icon: FileText, color: "text-primary" },
    { label: "CIBIL Score", value: "750", icon: TrendingUp, color: "text-success" },
    { label: "Pending Reminders", value: "5", icon: Clock, color: "text-warning" },
    { label: "Documents", value: "12", icon: FolderOpen, color: "text-secondary" },
  ];

  const features = [
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn how to improve your CIBIL score",
      action: () => {}
    },
    {
      icon: Headphones,
      title: "Audio Guides",
      description: "Listen to financial advice on the go",
      action: () => {}
    },
    {
      icon: FolderOpen,
      title: "Documents Library",
      description: "Access all your important documents",
      action: () => navigate("/documents")
    },
    {
      icon: TrendingUp,
      title: "CIBIL Predictor",
      description: "Predict and improve your credit score",
      action: () => navigate("/cibil-predictor")
    },
    {
      icon: Calculator,
      title: "Insurance Calculator",
      description: "Find the perfect insurance plan",
      action: () => navigate("/insurance")
    },
    {
      icon: MessageSquare,
      title: "AI ChatBot",
      description: "Get instant loan assistance",
      action: () => navigate("/chatbot")
    },
  ];

  const improvementTips = [
    {
      title: "Pay Bills on Time",
      description: "Set up automatic payments to never miss a due date",
      progress: 85,
      completed: true
    },
    {
      title: "Reduce Credit Utilization",
      description: "Keep your credit usage below 30% of total limit",
      progress: 65,
      completed: false
    },
    {
      title: "Check Credit Report",
      description: "Review your credit report for errors monthly",
      progress: 40,
      completed: false
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="gradient-hero rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-2">Welcome Back, Prathamesh!</h1>
            <p className="text-lg text-white/90 mb-6">
              Your current CIBIL score is 750 - That's Excellent! 🎉
            </p>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/cibil-predictor")}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="cursor-pointer hover:shadow-lg transition-base">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-base group"
                onClick={feature.action}
              >
                <CardHeader>
                  <div className="bg-gradient-card p-4 rounded-lg w-fit mb-2 group-hover:shadow-glow transition-base">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvement Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Improve Your CIBIL Score</CardTitle>
            <CardDescription>Follow these tips to boost your credit score</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {improvementTips.map((tip, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{tip.title}</h3>
                      {tip.completed && (
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                  <span className="text-sm font-medium">{tip.progress}%</span>
                </div>
                <Progress value={tip.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
