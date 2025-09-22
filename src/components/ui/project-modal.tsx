import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink,
  Calendar,
  Tag,
  Play,
  X
} from "lucide-react";

interface ProjectModalProps {
  project: {
    id: string;
    title: string;
    category: string;
    description: string;
    longDescription?: string;
    imageUrl?: string;
    videoUrl?: string;
    embedCode?: string;
    projectUrl?: string;
    technologies?: string[];
    date: string;
    type: string;
  };
  children: React.ReactNode;
  language: "en" | "ar";
}

export const ProjectModal = ({ project, children, language }: ProjectModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    en: {
      viewProject: "View Live Project",
      technologies: "Technologies Used",
      projectDetails: "Project Details",
      category: "Category",
      type: "Type",
      date: "Date",
      close: "Close"
    },
    ar: {
      viewProject: "عرض المشروع المباشر",
      technologies: "التقنيات المستخدمة",
      projectDetails: "تفاصيل المشروع",
      category: "الفئة",
      type: "النوع",
      date: "التاريخ",
      close: "إغلاق"
    }
  };

  const t = content[language];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer w-full h-full">
          {children}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 glass border-border/20" 
        onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/20">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-neon-primary">
                {project.title}
              </h2>
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {project.category}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Media Section */}
              <div className="mb-8">
                {project.embedCode ? (
                  <div 
                    className="aspect-video w-full rounded-lg overflow-hidden bg-black/20"
                    dangerouslySetInnerHTML={{ __html: project.embedCode }}
                  />
                ) : project.videoUrl ? (
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black/20 flex items-center justify-center">
                    <Play className="h-16 w-16 text-white/60" />
                  </div>
                ) : project.imageUrl ? (
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="aspect-video w-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-white/60" />
                  </div>
                )}
              </div>

              {/* Project Info Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Description */}
                <div>
                  <h3 className="text-xl font-bold text-neon-primary mb-4">
                    {t.projectDetails}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.longDescription || project.description}
                  </p>

                  {/* Project Links */}
                  {project.projectUrl && (
                    <Button
                      asChild
                      className="btn-cinematic text-white border-none hover:scale-105 transition-transform"
                    >
                      <a 
                        href={project.projectUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>{t.viewProject}</span>
                      </a>
                    </Button>
                  )}
                </div>

                {/* Right Column - Meta Info */}
                <div>
                  {/* Project Meta */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <Tag className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{t.category}:</span>
                      <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Tag className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">{t.type}:</span>
                      <Badge variant="secondary">{project.type}</Badge>
                    </div>
                    
                  </div>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">
                        {t.technologies}:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};