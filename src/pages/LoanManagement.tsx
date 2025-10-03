import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Archive, Eye, Bell } from "lucide-react";

const LoanManagement = () => {
  const loans = [
    {
      id: "LN001",
      type: "Home Loan",
      amount: "₹25,00,000",
      status: "Active",
      date: "2024-01-15",
      emi: "₹22,500"
    },
    {
      id: "LN002",
      type: "Personal Loan",
      amount: "₹3,00,000",
      status: "Approved",
      date: "2024-02-20",
      emi: "₹8,500"
    },
    {
      id: "LN003",
      type: "Car Loan",
      amount: "₹8,00,000",
      status: "Pending",
      date: "2024-03-10",
      emi: "₹15,000"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success";
      case "Approved":
        return "bg-primary";
      case "Pending":
        return "bg-warning";
      case "Rejected":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Loan Management</h1>
            <p className="text-muted-foreground text-lg">
              Track and manage all your loans
            </p>
          </div>
          <Button size="lg">
            <Plus className="mr-2" />
            Add New Loan
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Loans</p>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Active Loans</p>
              <p className="text-3xl font-bold text-success">1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
              <p className="text-3xl font-bold">₹36L</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-3xl font-bold">₹46K</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search loans..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">All Status</Button>
                <Button variant="outline">Date Range</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Loan ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>EMI</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.map((loan) => (
                  <TableRow key={loan.id}>
                    <TableCell className="font-medium">{loan.id}</TableCell>
                    <TableCell>{loan.type}</TableCell>
                    <TableCell>{loan.amount}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{loan.emi}</TableCell>
                    <TableCell>{loan.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Archive className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Reminders Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
            <CardDescription>Set reminders for your loan payments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Home Loan EMI</p>
                <p className="text-sm text-muted-foreground">Due: April 5, 2024</p>
              </div>
              <Button size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Set Reminder
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium">Personal Loan EMI</p>
                <p className="text-sm text-muted-foreground">Due: April 10, 2024</p>
              </div>
              <Button size="sm">
                <Bell className="mr-2 h-4 w-4" />
                Set Reminder
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LoanManagement;
