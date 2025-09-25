import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "@/components/ui/project-modal";
import { 
  Sparkles, 
  Play, 
  ArrowRight,
  Camera,
  Monitor,
  Palette,
  Film,
  Zap,
  Eye,
  Calendar,
  ExternalLink
} from "lucide-react";
import beyondHorizonThumbnail from "@/assets/beyond-horizon-thumbnail.jpg";

const Studio = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();

  const content = {
    en: {
      heroTitle: "Studio",
      heroSubtitle: "Cinematic Visual Productions",
      heroDescription: "We create stunning visual experiences that captivate audiences and bring your stories to life through cutting-edge VFX, animation, and motion graphics.",

      servicesTitle: "Our Studio Services",
      services: [
        {
          icon: Zap,
          title: "VFX & CGI",
          description: "Hollywood-quality visual effects and computer-generated imagery for films, commercials, and digital content.",
          features: ["Compositing", "3D Integration", "Particle Systems", "Photorealistic Rendering"],
          projects: ["Automotive Commercials", "Product Launches", "Brand Films"]
        },
        {
          icon: Monitor,
          title: "3D Animation",
          description: "Stunning 3D animations that bring characters, products, and concepts to life with precision and artistry.",
          features: ["Character Animation", "Product Visualization", "Architectural Walkthrough", "Motion Capture"],
          projects: ["Explainer Videos", "Product Demos", "Brand Mascots"]
        },
        {
          icon: Palette,
          title: "Motion Graphics",
          description: "Dynamic motion graphics and kinetic typography that communicate your message with style and impact.",
          features: ["2D Animation", "Kinetic Typography", "Logo Animation", "Infographic Design"],
          projects: ["TV Commercials", "Social Media Content", "Presentations"]
        },
        {
          icon: Film,
          title: "Brand Films",
          description: "Cinematic brand storytelling that creates emotional connections and drives engagement.",
          features: ["Concept Development", "Storyboarding", "Cinematography", "Color Grading"],
          projects: ["Corporate Films", "Documentary Style", "Testimonials"]
        },
        {
          icon: Camera,
          title: "Commercial Videos",
          description: "High-impact commercial videos that showcase your products and services in the best light.",
          features: ["Product Photography", "Commercial Shoots", "Lifestyle Content", "Social Media Ads"],
          projects: ["TV Commercials", "Online Campaigns", "Social Content"]
        },
        {
          icon: Eye,
          title: "Post-Production",
          description: "Professional post-production services including editing, color correction, and audio mixing.",
          features: ["Video Editing", "Color Grading", "Audio Mixing", "Sound Design"],
          projects: ["Film Editing", "Commercial Polish", "Content Optimization"]
        }
      ],

      processTitle: "Our Creative Process",
      process: [
        {
          step: "01",
          title: "Discovery & Concept",
          description: "We dive deep into your vision, brand, and objectives to create a compelling creative concept."
        },
        {
          step: "02",
          title: "Pre-Production",
          description: "Detailed planning including storyboarding, casting, location scouting, and technical preparation."
        },
        {
          step: "03",
          title: "Production",
          description: "Professional filming or animation creation using state-of-the-art equipment and techniques."
        },
        {
          step: "04",
          title: "Post-Production",
          description: "Expert editing, VFX, color grading, and audio mixing to perfect your final product."
        },
        {
          step: "05",
          title: "Delivery & Support",
          description: "Final delivery in all required formats with ongoing support for any additional needs."
        }
      ],

      portfolioTitle: "Featured Studio Work",
      viewFullPortfolio: "View Full Portfolio",
      
      ctaTitle: "Ready to Create Something Spectacular?",
      ctaDescription: "Let's bring your vision to life with cinematic quality",
      ctaButton: "Start Your Studio Project"
    },
    ar: {
      heroTitle: "الاستوديو",
      heroSubtitle: "إنتاج مرئي سينمائي",
      heroDescription: "نصنع تجارب بصرية مذهلة تأسر الجماهير وتحيي قصصك من خلال المؤثرات البصرية المتطورة والرسوم المتحركة والجرافيك المتحرك.",
      
      servicesTitle: "خدمات الاستوديو",
      services: [
        {
          icon: Zap,
          title: "المؤثرات البصرية والرسوم الحاسوبية",
          description: "مؤثرات بصرية ورسوم حاسوبية بجودة هوليوودية للأفلام والإعلانات والمحتوى الرقمي.",
          features: ["التركيب", "التكامل ثلاثي الأبعاد", "أنظمة الجسيمات", "الرندر الفوتوغرافي"],
          projects: ["إعلانات السيارات", "إطلاق المنتجات", "أفلام العلامات التجارية"]
        },
        {
          icon: Monitor,
          title: "الرسوم المتحركة ثلاثية الأبعاد",
          description: "رسوم متحركة ثلاثية الأبعاد مذهلة تحيي الشخصيات والمنتجات والمفاهيم بدقة وفنية.",
          features: ["رسوم الشخصيات المتحركة", "تصور المنتجات", "جولات معمارية", "التقاط الحركة"],
          projects: ["فيديوهات توضيحية", "عروض المنتجات", "تميمة العلامة التجارية"]
        },
         {
           icon: Palette,
           title: "موشن جرافيك",
           description: "رسوم متحركة ديناميكية وطباعة حركية تنقل رسالتك بأناقة وتأثير.",
          features: ["رسوم متحركة ثنائية الأبعاد", "طباعة حركية", "شعارات متحركة", "تصميم إنفوجرافيك"],
          projects: ["إعلانات تلفزيونية", "محتوى الشبكات الاجتماعية", "عروض تقديمية"]
        },
        {
          icon: Film,
          title: "أفلام العلامات التجارية",
          description: "سرد سينمائي للعلامة التجارية يخلق روابط عاطفية ويدفع المشاركة.",
          features: ["تطوير المفاهيم", "لوحات العمل", "السينماتوغرافيا", "تدريج الألوان"],
          projects: ["أفلام الشركات", "نمط وثائقي", "شهادات العملاء"]
        },
        {
          icon: Camera,
          title: "الفيديوهات التجارية",
          description: "فيديوهات تجارية عالية التأثير تعرض منتجاتك وخدماتك في أفضل صورة.",
          features: ["تصوير المنتجات", "التصوير التجاري", "المحتوى الحياتي", "إعلانات الشبكات الاجتماعية"],
          projects: ["إعلانات تلفزيونية", "حملات إلكترونية", "محتوى اجتماعي"]
        },
        {
          icon: Eye,
          title: "ما بعد الإنتاج",
          description: "خدمات ما بعد الإنتاج المهنية بما في ذلك المونتاج وتصحيح الألوان وخلط الصوت.",
          features: ["مونتاج الفيديو", "تدريج الألوان", "خلط الصوت", "تصميم الصوت"],
          projects: ["مونتاج الأفلام", "تلميع الإعلانات", "تحسين المحتوى"]
        }
      ],

      processTitle: "عمليتنا الإبداعية",
      process: [
        {
          step: "01",
          title: "الاكتشاف والمفهوم",
          description: "نتعمق في رؤيتك وعلامتك التجارية وأهدافك لإنشاء مفهوم إبداعي مقنع."
        },
        {
          step: "02",
          title: "ما قبل الإنتاج",
          description: "التخطيط التفصيلي بما في ذلك لوحات العمل والاختيار واستكشاف المواقع والإعداد التقني."
        },
        {
          step: "03",
          title: "الإنتاج",
          description: "تصوير احترافي أو إنشاء رسوم متحركة باستخدام أحدث المعدات والتقنيات."
        },
        {
          step: "04",
          title: "ما بعد الإنتاج",
          description: "مونتاج خبير ومؤثرات بصرية وتدريج ألوان وخلط صوت لإتقان منتجك النهائي."
        },
        {
          step: "05",
          title: "التسليم والدعم",
          description: "التسليم النهائي بجميع التنسيقات المطلوبة مع دعم مستمر لأي احتياجات إضافية."
        }
      ],

      portfolioTitle: "أعمال الاستوديو المميزة",
      viewFullPortfolio: "عرض المعرض الكامل",
      
      ctaTitle: "هل أنت مستعد لصنع شيء مذهل؟",
      ctaDescription: "دعنا نحقق رؤيتك بجودة سينمائية",
      ctaButton: "ابدأ مشروع الاستوديو الخاص بك"
    }
  };

  const t = content[language];

  // Real portfolio items
  const portfolioItems = [
    {
      id: "beyond-horizon",
      title: language === 'ar' ? 'ما وراء أفق الزمن' : 'Beyond the Horizon of Time',
      category: language === 'ar' ? 'الاستوديو' : 'Studio',
      description: language === 'ar' 
        ? 'فيلم قصير ثلاثي الأبعاد يتبع رحلة سيارة بي إم دبليو عبر بوابة زمنية'
        : 'A 3D short film following a BMW\'s journey through a time portal',
      longDescription: language === 'ar'
        ? 'عمل سينمائي ثلاثي الأبعاد متطور يجمع بين تقنيات الرسوم المتحركة المتقدمة والمؤثرات البصرية المذهلة. يحكي الفيلم قصة رحلة استثنائية عبر الزمن، حيث تصبح سيارة بي إم دبليو العادية جزءاً من مغامرة خيالية تحولها إلى مركبة الأبطال الخارقين الشهيرة "باتموبايل".'
        : 'An advanced 3D cinematic work that combines cutting-edge animation techniques with stunning visual effects. The film tells the story of an extraordinary journey through time, where an ordinary BMW becomes part of a fantasy adventure that transforms it into the famous superhero vehicle "Batmobile".',
      imageUrl: beyondHorizonThumbnail,
      embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/1deJM-7X9oo" title="VisCend - Beyond The Horizon of Time" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      technologies: ["3D Animation", "VFX", "Motion Graphics", "Cinema 4D", "After Effects", "Premiere Pro"],
      date: "2024",
      type: language === 'ar' ? 'فيلم قصير ثلاثي الأبعاد' : '3D Short Film',
      tags: ["3D Animation", "VFX", "Cinema 4D"]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-primary/20 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-medium text-neon-primary">
                Visual Productions
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                {t.heroTitle}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-light text-neon-secondary mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {t.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.servicesTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="p-3 rounded-full bg-gradient-to-br from-primary to-secondary">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-neon-primary group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="font-semibold text-secondary mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-accent mb-3">Project Types:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {service.projects.map((project, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-primary rounded-full" />
                            <span>{project}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.processTitle}
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {t.process.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 mb-12 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-neon-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.portfolioTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <ProjectModal
                key={item.id}
                project={item}
                language={language}
              >
                <Card 
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/20 text-primary border-primary/30">
                          {item.category}
                        </Badge>
                      </div>
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                            <Eye className="h-6 w-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-neon-primary group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ProjectModal>
            ))}
          </div>

          {/* View Full Portfolio Button */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="btn-cinematic text-white border-none hover:scale-105 transition-transform"
            >
              <Link to="/portfolio">
                {t.viewFullPortfolio}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-primary/30 hover:border-primary/50"
              asChild
            >
              <Link to="/portfolio" className="flex items-center space-x-2">
                <span>View Full Studio Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                {t.ctaTitle}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              {t.ctaDescription}
            </p>
            
            <Button 
              size="lg"
              className="btn-cinematic text-white border-none px-8 py-6 text-lg animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
              asChild
            >
              <Link to="/contact">
                {t.ctaButton}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Studio;
