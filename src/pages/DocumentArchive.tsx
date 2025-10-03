import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Search, 
  FileText, 
  Image as ImageIcon, 
  File, 
  Download, 
  Eye, 
  Trash2,
  Grid3x3,
  List
} from "lucide-react";

const DocumentArchive = () => {
  const documents = [
    {
      id: 1,
      name: "Aadhar Card.pdf",
      type: "PDF",
      size: "2.5 MB",
      date: "March 15, 2024",
      category: "Identity Docs",
      icon: FileText
    },
    {
      id: 2,
      name: "Salary Slip.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "March 20, 2024",
      category: "Income Proofs",
      icon: FileText
    },
    {
      id: 3,
      name: "Property Papers.pdf",
      type: "PDF",
      size: "5.8 MB",
      date: "March 25, 2024",
      category: "Loan Agreements",
      icon: FileText
    },
    {
      id: 4,
      name: "Bank Statement.pdf",
      type: "PDF",
      size: "3.2 MB",
      date: "March 28, 2024",
      category: "Income Proofs",
      icon: FileText
    },
  ];

  const categories = [
    "All Documents",
    "Income Proofs",
    "Identity Docs",
    "Loan Agreements",
    "Others"
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Document Archive</h1>
            <p className="text-muted-foreground text-lg">
              Securely store and manage your documents
            </p>
          </div>
          <Button size="lg">
            <Upload className="mr-2" />
            Upload Documents
          </Button>
        </div>

        {/* Storage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Documents</p>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Storage Used</p>
              <p className="text-3xl font-bold">45 MB</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <p className="text-3xl font-bold">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Categories</p>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className="w-full justify-start"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid/List */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search documents..." className="pl-10" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Grid3x3 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pdf">PDF</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-3 mt-4">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-base"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-lg">
                            <doc.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{doc.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.date}</span>
                              <Badge variant="outline" className="ml-2">
                                {doc.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pdf">
                    <p className="text-center text-muted-foreground py-8">
                      Filtered PDF documents will appear here
                    </p>
                  </TabsContent>

                  <TabsContent value="images">
                    <p className="text-center text-muted-foreground py-8">
                      Filtered images will appear here
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentArchive;
