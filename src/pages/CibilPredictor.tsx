import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CibilPredictor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [predictedScore, setPredictedScore] = useState(750);
  
  const [formData, setFormData] = useState({
    income: "",
    existingLoans: "",
    paymentHistory: "",
    creditUtilization: 50,
    recentInquiries: "",
  });

  const handleCalculate = () => {
    setLoading(true);
    
    setTimeout(() => {
      const score = 650 + Math.floor(Math.random() * 200);
      setPredictedScore(score);
      setShowResults(true);
      setLoading(false);
      
      toast({
        title: "Score Calculated!",
        description: `Your predicted CIBIL score is ${score}`,
      });
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score < 600) return "text-destructive";
    if (score < 750) return "text-warning";
    return "text-success";
  };

  const getScoreBgColor = (score: number) => {
    if (score < 600) return "bg-destructive";
    if (score < 750) return "bg-warning";
    return "bg-success";
  };

  const factors = [
    { name: "Payment History", impact: 85, positive: true },
    { name: "Credit Utilization", impact: 65, positive: false },
    { name: "Credit Age", impact: 75, positive: true },
    { name: "Recent Inquiries", impact: 45, positive: false },
  ];

  const suggestions = [
    "Pay all bills on time for the next 6 months to boost your score",
    "Reduce credit card utilization below 30% of limit",
    "Avoid applying for new credit in the next 3 months",
    "Check your credit report for errors and dispute them",
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">CIBIL Score Predictor</h1>
          <p className="text-muted-foreground text-lg">
            Predict your credit score with AI-powered analysis
          </p>
        </div>

        {/* Score Gauge */}
        <Card className="border-2">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-hero rounded-full opacity-10 animate-pulse-slow"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(predictedScore)}`}>
                      {showResults ? predictedScore : "---"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      {showResults ? "Predicted Score" : "Calculate Score"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-destructive">Poor (300)</span>
                  <span className="text-success">Excellent (900)</span>
                </div>
                <Progress 
                  value={showResults ? ((predictedScore - 300) / 600) * 100 : 0} 
                  className="h-3"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Details</CardTitle>
            <CardDescription>Provide accurate information for better predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="financial">Financial Details</TabsTrigger>
                <TabsTrigger value="credit">Credit History</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="income">Monthly Income (₹)</Label>
                  <Input
                    id="income"
                    type="number"
                    placeholder="50000"
                    value={formData.income}
                    onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="financial" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="loans">Existing Loans Count</Label>
                  <Input
                    id="loans"
                    type="number"
                    placeholder="2"
                    value={formData.existingLoans}
                    onChange={(e) => setFormData({ ...formData, existingLoans: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Credit Utilization: {formData.creditUtilization}%</Label>
                  <Slider
                    value={[formData.creditUtilization]}
                    onValueChange={(value) => setFormData({ ...formData, creditUtilization: value[0] })}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep below 30% for optimal score
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="credit" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="history">Payment History</Label>
                  <Select
                    value={formData.paymentHistory}
                    onValueChange={(value) => setFormData({ ...formData, paymentHistory: value })}
                  >
                    <SelectTrigger id="history">
                      <SelectValue placeholder="Select payment history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (No late payments)</SelectItem>
                      <SelectItem value="good">Good (1-2 late payments)</SelectItem>
                      <SelectItem value="fair">Fair (3-5 late payments)</SelectItem>
                      <SelectItem value="poor">Poor (6+ late payments)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inquiries">Recent Credit Inquiries (Last 6 months)</Label>
                  <Input
                    id="inquiries"
                    type="number"
                    placeholder="1"
                    value={formData.recentInquiries}
                    onChange={(e) => setFormData({ ...formData, recentInquiries: e.target.value })}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              className="w-full mt-6" 
              size="lg"
              onClick={handleCalculate}
              disabled={loading}
            >
              {loading ? (
                <>Calculating...</>
              ) : (
                <>
                  <Sparkles className="mr-2" />
                  Calculate Score with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-scale-in">
            {/* Factors Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Score Factors</CardTitle>
                <CardDescription>How different factors impact your score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {factors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {factor.positive ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <span className="font-medium">{factor.name}</span>
                      </div>
                      <span className="text-sm">{factor.impact}%</span>
                    </div>
                    <Progress value={factor.impact} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
                <CardDescription>Follow these tips to boost your score</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-medium mt-0.5">
                        {index + 1}
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Save Report
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  setShowResults(false);
                  setFormData({
                    income: "",
                    existingLoans: "",
                    paymentHistory: "",
                    creditUtilization: 50,
                    recentInquiries: "",
                  });
                }}
              >
                Start New Calculation
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CibilPredictor;
