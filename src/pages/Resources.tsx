import { motion } from "framer-motion";
import { FileText, Download, Eye, BookOpen, Video, FileImage, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const resources = [
  {
    id: 1,
    title: "Advanced Mathematics Textbook",
    type: "PDF",
    subject: "Mathematics",
    size: "12.5 MB",
    pages: 450,
    downloads: 1250,
    uploadDate: "2024-01-15",
    description: "Comprehensive guide covering calculus, algebra, and geometry"
  },
  {
    id: 2,
    title: "Physics Lab Manual",
    type: "PDF", 
    subject: "Physics",
    size: "8.2 MB",
    pages: 120,
    downloads: 890,
    uploadDate: "2024-01-20",
    description: "Step-by-step laboratory experiments and procedures"
  },
  {
    id: 3,
    title: "Chemistry Video Lectures",
    type: "Video",
    subject: "Chemistry",
    size: "2.1 GB",
    duration: "4h 30m",
    downloads: 654,
    uploadDate: "2024-02-01",
    description: "Complete video series on organic and inorganic chemistry"
  },
  {
    id: 4,
    title: "English Literature Notes",
    type: "PDF",
    subject: "English",
    size: "5.8 MB", 
    pages: 85,
    downloads: 1100,
    uploadDate: "2024-01-28",
    description: "Analysis of major literary works and poetry"
  },
  {
    id: 5,
    title: "Biology Diagrams Collection",
    type: "Images",
    subject: "Biology",
    size: "156 MB",
    files: 75,
    downloads: 445,
    uploadDate: "2024-02-10",
    description: "High-quality diagrams for cell biology and anatomy"
  },
  {
    id: 6,
    title: "History Timeline Poster",
    type: "PDF",
    subject: "History", 
    size: "3.2 MB",
    pages: 1,
    downloads: 320,
    uploadDate: "2024-02-05",
    description: "Visual timeline of world history events"
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "PDF": return FileText;
    case "Video": return Video;
    case "Images": return FileImage;
    default: return FileText;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "PDF": return "bg-destructive text-destructive-foreground";
    case "Video": return "bg-primary text-primary-foreground";
    case "Images": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function Resources() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Study Resources</h1>
        <p className="text-muted-foreground">Download materials for offline learning</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-bold">24</h3>
          <p className="text-sm text-muted-foreground">Total Resources</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <Download className="w-6 h-6 text-accent-foreground" />
          </div>
          <h3 className="text-2xl font-bold">156</h3>
          <p className="text-sm text-muted-foreground">Downloads</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-success-foreground" />
          </div>
          <h3 className="text-2xl font-bold">8</h3>
          <p className="text-sm text-muted-foreground">Subjects</p>
        </motion.div>

        <motion.div
          className="learning-card text-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-12 h-12 bg-warning rounded-xl flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-warning-foreground" />
          </div>
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-muted-foreground">Recently Viewed</p>
        </motion.div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const TypeIcon = getTypeIcon(resource.type);
          
          return (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="learning-card group hover:shadow-large transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-12 h-12 bg-muted/50 rounded-xl flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{resource.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subject:</span>
                      <Badge variant="secondary">{resource.subject}</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="font-medium">{resource.size}</span>
                    </div>
                    
                    {resource.pages && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Pages:</span>
                        <span className="font-medium">{resource.pages}</span>
                      </div>
                    )}
                    
                    {resource.duration && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{resource.duration}</span>
                      </div>
                    )}
                    
                    {resource.files && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Files:</span>
                        <span className="font-medium">{resource.files}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Downloads:</span>
                      <span className="font-medium">{resource.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Added {new Date(resource.uploadDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 group-hover:shadow-medium transition-all duration-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Offline Learning Note */}
      <motion.div
        className="mt-12 p-6 bg-accent/5 border border-accent/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <h3 className="text-lg font-semibold text-accent mb-2">📱 Offline Learning Available</h3>
        <p className="text-muted-foreground mb-4">
          Download resources for offline access. This app works as a Progressive Web App (PWA) 
          for seamless offline learning experiences.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">PWA Ready</Badge>
          <Badge variant="outline">Offline Access</Badge>
          <Badge variant="outline">Download & Save</Badge>
        </div>
      </motion.div>

      {/* Note about backend */}
      <motion.div
        className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <h3 className="text-lg font-semibold text-primary mb-2">Ready for File Storage?</h3>
        <p className="text-muted-foreground mb-4">
          To upload and manage real files, enable secure downloads, and track usage analytics, 
          connect your app to Supabase for robust file storage capabilities.
        </p>
        <Button variant="outline">
          <FileText className="w-4 h-4 mr-2" />
          Learn About File Storage
        </Button>
      </motion.div>
    </div>
  );
}