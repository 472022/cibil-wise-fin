import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Shield, Heart, Car, Home, Check } from "lucide-react";

const InsuranceCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [showResults, setShowResults] = useState(false);

  const insuranceTypes = [
    { icon: Heart, label: "Life Insurance", value: "life" },
    { icon: Shield, label: "Health Insurance", value: "health" },
    { icon: Car, label: "Vehicle Insurance", value: "vehicle" },
    { icon: Home, label: "Property Insurance", value: "property" },
  ];

  const plans = [
    {
      name: "Basic Plan",
      premium: "₹5,000",
      coverage: "₹5,00,000",
      features: ["Basic coverage", "24/7 Support", "Online claims"]
    },
    {
      name: "Standard Plan",
      premium: "₹8,500",
      coverage: "₹10,00,000",
      features: ["Comprehensive coverage", "Priority support", "Quick claims", "Family coverage"],
      recommended: true
    },
    {
      name: "Premium Plan",
      premium: "₹15,000",
      coverage: "₹25,00,000",
      features: ["Maximum coverage", "Dedicated manager", "Instant claims", "Global coverage", "Wellness programs"]
    },
  ];

  const handleCalculate = () => {
    setShowResults(true);
  };

  const steps = [
    { number: 1, label: "Type Selection" },
    { number: 2, label: "Personal Info" },
    { number: 3, label: "Coverage Details" },
    { number: 4, label: "Results" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Insurance Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect insurance plan for your needs
          </p>
        </div>

        {/* Progress Stepper */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        currentStep >= step.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span className="text-sm mt-2 hidden sm:block">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 ${
                        currentStep > step.number ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Insurance Type */}
        {currentStep === 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in">
            {insuranceTypes.map((type) => (
              <Card
                key={type.value}
                className={`cursor-pointer hover:shadow-lg transition-base ${
                  selectedType === type.value ? "border-primary border-2" : ""
                }`}
                onClick={() => setSelectedType(type.value)}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-card p-6 rounded-lg w-fit mx-auto mb-4">
                    <type.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{type.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Step 2: Personal Info */}
        {currentStep === 2 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Help us understand your needs better</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" placeholder="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" placeholder="Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="income">Annual Income (₹)</Label>
                  <Input id="income" type="number" placeholder="500000" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Coverage Details */}
        {currentStep === 3 && (
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Coverage Details</CardTitle>
              <CardDescription>Customize your insurance coverage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Coverage Amount: ₹10,00,000</Label>
                <Slider defaultValue={[1000000]} max={5000000} step={100000} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="term">Policy Term</Label>
                <Select>
                  <SelectTrigger id="term">
                    <SelectValue placeholder="Select policy term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" size="lg" onClick={handleCalculate}>
                Calculate Premium
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && showResults && (
          <div className="space-y-6 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle>Your Insurance Plans</CardTitle>
                <CardDescription>Choose the plan that suits you best</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {plans.map((plan, index) => (
                    <Card 
                      key={index}
                      className={`relative ${plan.recommended ? 'border-primary border-2' : ''}`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        </div>
                      )}
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold">{plan.name}</h3>
                          <p className="text-3xl font-bold text-primary mt-2">{plan.premium}</p>
                          <p className="text-sm text-muted-foreground">per year</p>
                        </div>
                        
                        <div className="py-4 border-y">
                          <p className="text-sm text-muted-foreground">Coverage</p>
                          <p className="text-2xl font-bold">{plan.coverage}</p>
                        </div>

                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-success" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button 
                          className="w-full" 
                          variant={plan.recommended ? "default" : "outline"}
                        >
                          Select Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentStep < 4) {
                setCurrentStep(currentStep + 1);
              }
            }}
            disabled={currentStep === 4}
          >
            {currentStep === 3 ? "View Results" : "Next"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InsuranceCalculator;
