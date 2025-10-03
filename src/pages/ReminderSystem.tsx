import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle2, Plus, Edit, Trash2, Bell } from "lucide-react";

const ReminderSystem = () => {
  const reminders = [
    {
      id: 1,
      title: "Home Loan EMI Payment",
      description: "Monthly payment due for home loan",
      date: "April 5, 2024",
      priority: "high",
      category: "Loan Payments"
    },
    {
      id: 2,
      title: "CIBIL Score Check",
      description: "Monthly credit score review",
      date: "April 10, 2024",
      priority: "medium",
      category: "CIBIL Checks"
    },
    {
      id: 3,
      title: "Upload Income Proof",
      description: "Submit updated income documents",
      date: "April 15, 2024",
      priority: "low",
      category: "Documents"
    },
  ];

  const completedReminders = [
    {
      id: 4,
      title: "Personal Loan EMI",
      completedDate: "March 28, 2024"
    },
    {
      id: 5,
      title: "Insurance Premium",
      completedDate: "March 25, 2024"
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-warning";
      case "low":
        return "bg-success";
      default:
        return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Reminders</h1>
            <p className="text-muted-foreground text-lg">
              Stay on top of your loan payments and important tasks
            </p>
          </div>
          <Button size="lg">
            <Plus className="mr-2" />
            Create Reminder
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-success/10 p-3 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-destructive/10 p-3 rounded-lg">
                  <Bell className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reminders Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {reminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge className={getPriorityColor(reminder.priority)}>
                          {reminder.priority}
                        </Badge>
                        <Badge variant="outline">{reminder.category}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{reminder.title}</h3>
                      <p className="text-muted-foreground mb-3">{reminder.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{reminder.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {completedReminders.map((reminder) => (
              <Card key={reminder.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="h-6 w-6 text-success" />
                      <div>
                        <h3 className="font-semibold">{reminder.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Completed on {reminder.completedDate}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ReminderSystem;
