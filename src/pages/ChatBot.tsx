import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// User context data for the AI assistant
const USER_CONTEXT = {
  name: "Prathamesh",
  email: "prathamesh@gmail.com",
  cibilScore: 750,
  loans: [
    { id: "L001", type: "Personal Loan", amount: 500000, status: "Active", applicationDate: "2024-01-15" },
    { id: "L002", type: "Home Loan", amount: 2500000, status: "Approved", applicationDate: "2024-02-20" },
    { id: "L003", type: "Car Loan", amount: 800000, status: "Pending", applicationDate: "2024-03-10" }
  ],
  reminders: [
    { title: "Home Loan EMI Due", date: "2024-04-05", priority: "High" },
    { title: "Update Income Proof", date: "2024-04-10", priority: "Medium" }
  ],
  documents: [
    { name: "Aadhaar Card.pdf", type: "Identity", uploadDate: "2024-01-10" },
    { name: "Salary Slip March.pdf", type: "Income Proof", uploadDate: "2024-03-01" }
  ]
};

const GEMINI_API_KEY = "AIzaSyDfKnHD-akjnmcc2l1rzudEgjQrWwn3Mnc";

const ChatBot = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello Prathamesh! I'm your AI Loan Assistant for AI CIBIL Store. I have access to your profile data and can help you with:\n\n• Your current CIBIL score (${USER_CONTEXT.cibilScore})\n• Your ${USER_CONTEXT.loans.length} loan applications\n• Document management\n• EMI calculations\n• Loan eligibility checks\n\nHow can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    "What's my CIBIL score?",
    "Show my active loans",
    "Calculate EMI",
    "Check upcoming reminders",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const callGeminiAPI = async (userMessage: string) => {
    const systemPrompt = `You are an AI Loan Assistant for AI CIBIL Store platform. You help users with their loan applications, CIBIL scores, and financial queries.

User Profile:
- Name: ${USER_CONTEXT.name}
- Email: ${USER_CONTEXT.email}
- Current CIBIL Score: ${USER_CONTEXT.cibilScore}
- Active Loans: ${JSON.stringify(USER_CONTEXT.loans)}
- Upcoming Reminders: ${JSON.stringify(USER_CONTEXT.reminders)}
- Documents: ${JSON.stringify(USER_CONTEXT.documents)}

Guidelines:
- Be helpful, professional, and concise
- Use the user's data to provide personalized responses
- If asked about CIBIL score, loans, reminders, or documents, use the actual data provided
- Provide actionable advice for improving CIBIL scores
- Help with loan eligibility and EMI calculations
- Address the user by name (${USER_CONTEXT.name})`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${systemPrompt}\n\nUser Question: ${userMessage}`,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response from Gemini");
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const botResponse = await callGeminiAPI(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">AI Loan Assistant</h1>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-success text-success-foreground">
              <span className="w-2 h-2 bg-success-foreground rounded-full mr-2 animate-pulse"></span>
              Online
            </Badge>
            <span className="text-muted-foreground">Ask me anything about loans</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
          {/* Chat Area */}
          <Card className="lg:col-span-3 flex flex-col">
            <CardHeader className="border-b">
              <CardTitle>Chat</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-2 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>
            <div className="border-t p-4">
              <div className="flex gap-2 mb-3">
                {quickActions.map((action) => (
                  <Button
                    key={action}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action)}
                  >
                    {action}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Check Loan Eligibility
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Calculate EMI
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Compare Loan Offers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Track Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatBot;
