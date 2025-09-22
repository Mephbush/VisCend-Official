import { useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/sections/Hero";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScrollRevealGroup from "@/components/ui/scroll-reveal-group";
import { 
  Sparkles, 
  Eye, 
  ArrowRight, 
  Play,
  CheckCircle,
  Star,
  Users,
  Award
} from "lucide-react";

const Home = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();
  
  const content = {
    en: {
      // Featured Projects Section
      featuredTitle: "Featured Projects",
      featuredSubtitle: "Discover our latest creative endeavors",
      
      // Services Section
      servicesTitle: "Our Expertise",
      servicesSubtitle: "Two powerful divisions, endless possibilities",
      studioTitle: "Studio",
      studioDescription: "Cinematic visual productions that tell your story",
      studioServices: [
        "VFX & CGI",
        "3D Animation",
        "Motion Graphics",
        "Brand Films",
        "Commercial Videos",
        "Post-Production"
      ],
      webTitle: "Web",
      webDescription: "Digital solutions that drive your business forward",
       webServices: [
         "Brand Identity & Digital Presence",
         "E-Commerce Platforms", 
         "Portfolio & Showcase Sites",
         "Custom Web Applications",
         "Performance & SEO Optimization",
         "Security & Digital Protection"
       ],
      
      // Why Choose Us
      whyChooseTitle: "Why Choose VisCend?",
      whyChooseSubtitle: "We deliver excellence through innovation and expertise",
      reasons: [
        {
          icon: Award,
          title: "10+ Years Combined Expertise",
          description: "Our team brings decades of experience from Hollywood productions to Fortune 500 digital transformations"
        },
        {
          icon: Users,
          title: "100% Client Satisfaction Rate",
          description: "Every project delivered on time, within budget, with zero compromises on quality"
        },
        {
          icon: Star,
          title: "Industry-Leading Technology",
          description: "We use the same tools as Disney, Netflix, and Apple - ensuring premium results for every project"
        },
        {
          icon: CheckCircle,
          title: "ROI-Focused Approach",
          description: "Every creative decision and technical choice is made to maximize your return on investment"
        }
      ],
      
      // CTA Section
      ctaTitle: "Ready to Transform Your Vision?",
      ctaDescription: "Let's create something extraordinary together",
      ctaButtonPrimary: "Start Your Project",
      ctaButtonSecondary: "View Portfolio"
    },
    ar: {
      // Featured Projects Section
      featuredTitle: "المشاريع المميزة",
      featuredSubtitle: "اكتشف أحدث مساعينا الإبداعية",
      
      // Services Section
      servicesTitle: "خبراتنا",
      servicesSubtitle: "قسمان قويان، إمكانيات لا محدودة",
      studioTitle: "الاستوديو",
      studioDescription: "إنتاج مرئي سينمائي يحكي قصتك",
       studioServices: [
         "المؤثرات البصرية والرسوم الحاسوبية",
         "الرسوم المتحركة ثلاثية الأبعاد",
         "موشن جرافيك",
        "أفلام العلامات التجارية",
        "الفيديوهات الإعلانية",
        "ما بعد الإنتاج"
      ],
      webTitle: "الويب",
      webDescription: "حلول رقمية تدفع عملك إلى الأمام",
       webServices: [
         "تصميم المواقع والهوية الرقمية",
         "منصات التجارة الإلكترونية",
         "مواقع المعارض والمحافظ",
         "تطبيقات الويب المخصصة",
         "الأداء وتحسين محركات البحث",
         "الأمان والحماية الرقمية"
       ],
      
      // Why Choose Us
      whyChooseTitle: "لماذا تختار VisCend؟",
      whyChooseSubtitle: "نقدم التميز من خلال الابتكار والخبرة",
      reasons: [
        {
          icon: Award,
          title: "خبرة مجمعة تزيد عن 10 سنوات",
          description: "فريقنا يجلب عقودًا من الخبرة من إنتاجات هوليوود إلى التحولات الرقمية لشركات Fortune 500"
        },
        {
          icon: Users,
          title: "معدل رضا العملاء 100%",
          description: "كل مشروع يُسلم في الوقت المحدد، ضمن الميزانية، بدون أي تنازل عن الجودة"
        },
        {
          icon: Star,
          title: "جودة حائزة على جوائز",
          description: "جودة معترف بها من جوائز ومنصات دولية، نقدم معايير عالية في كل مشروع"
        },
        {
          icon: CheckCircle,
          title: "نهج يركز على العائد على الاستثمار",
          description: "كل قرار ابداعي وخيار تقني يُتخذ لتعظيم العائد على الاستثمار"
        }
      ],
      
      // CTA Section
      ctaTitle: "هل أنت مستعد لتحويل رؤيتك؟",
      ctaDescription: "دعنا نصنع شيئًا استثنائيًا معًا",
      ctaButtonPrimary: "ابدأ مشروعك",
      ctaButtonSecondary: "شاهد المعرض"
    }
  };

  const t = content[language];

  // Sample featured projects
  const featuredProjects = [
    {
      id: 1,
      title: language === 'ar' ? 'ما وراء أفق الزمن' : 'Beyond the Horizon of Time',
      category: 'Studio',
      type: language === 'ar' ? 'فيلم قصير ثلاثي الأبعاد' : '3D Short Film',
      description: language === 'ar' 
        ? 'فيلم قصير ثلاثي الأبعاد يتبع رحلة سيارة بي إم دبليو عبر بوابة زمنية، حيث تتحول إلى باتموبايل وتدخل عالماً جديداً'
        : 'A 3D short film following a BMW\'s journey through a time portal, transforming into a Batmobile and entering a new world',
      videoEmbed: 'https://www.youtube.com/embed/1deJM-7X9oo',
      tags: ['3D Animation', 'VFX', 'Motion Graphics', 'Cinema 4D']
    },
    {
      id: 2,
      title: language === 'ar' ? 'مطعم بيلا فيستا' : 'Bella Vista Restaurant',
      category: 'Web',
      type: language === 'ar' ? 'موقع إلكتروني للمطاعم' : 'Restaurant Website',
      description: language === 'ar'
        ? 'موقع إلكتروني أنيق لمطعم راقي يتميز بنظام حجوزات متطور وعرض تفاعلي للقائمة مع تجربة مستخدم استثنائية'
        : 'An elegant website for a fine dining restaurant featuring an advanced reservation system and interactive menu display',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      projectUrl: 'https://rescend.netlify.app',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Booking System']
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero language={language} />

      {/* Featured Projects */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary relative z-[10]">
              {t.featuredTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-[10]">
              {t.featuredSubtitle}
            </p>
          </div>

          <ScrollRevealGroup className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" stagger={0.12} direction="up">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    {project.videoEmbed ? (
                      <div className="aspect-video relative">
                        <iframe 
                          className="absolute inset-0 w-full h-full rounded-t-lg"
                          src={project.videoEmbed} 
                          title={project.title} 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'Studio'
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-secondary/20 text-secondary border border-secondary/30'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                    {project.projectUrl && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="bg-black/50 hover:bg-black/70"
                        >
                          <a 
                            href={project.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Eye className="h-4 w-4 text-white" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-neon-primary group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-secondary font-medium mb-3">
                      {project.type}
                    </p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted/50 text-xs rounded-md text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Coming Soon Placeholder */}
            <div className="md:col-span-2 lg:col-span-1">
              <Card className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <Sparkles className="h-12 w-12 text-primary opacity-50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {language === 'ar' ? 'المزيد من المشاريع قادمة...' : 'More projects coming...'}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-neon-primary mb-2">
                    {language === 'ar' ? 'مشاريع جديدة' : 'New Projects'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' 
                      ? 'مشاريع مثيرة ومبتكرة في الطريق'
                      : 'Exciting and innovative projects on the way'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </ScrollRevealGroup>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="glass border-primary/30 hover:border-primary/50"
              asChild
            >
              <Link to="/portfolio" className="flex items-center space-x-2">
                <span>{language === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}</span>
                <ArrowRight className={`h-4 w-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary relative z-[10]">
              {t.servicesTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto relative z-[10]">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Studio Services */}
            <div className="glass rounded-3xl p-8 group hover:scale-105 transition-all duration-300 animate-slide-in-left">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-full bg-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-neon-primary">
                    {t.studioTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.studioDescription}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.studioServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20 hover:bg-primary/10 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{service}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full btn-cinematic text-white border-none"
                asChild
              >
                <Link to="/studio">
                  Explore Studio Services
                </Link>
              </Button>
            </div>

            {/* Web Services */}
            <div className="glass rounded-3xl p-8 group hover:scale-105 transition-all duration-300 animate-slide-in-right">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-full bg-secondary/20">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-neon-secondary">
                    {t.webTitle}
                  </h3>
                  <p className="text-muted-foreground">
                    {t.webDescription}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.webServices.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20 hover:bg-secondary/10 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                    <span className="text-sm font-medium">{service}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full btn-cinematic text-white border-none group relative overflow-hidden"
                asChild
              >
                <Link to="/web" className="flex items-center justify-center gap-2">
                  <span className="relative z-10">Explore Web Services</span>
                  <ArrowRight className="h-4 w-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-accent/20 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              {t.whyChooseTitle}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t.whyChooseSubtitle}
            </p>
          </div>

          <ScrollRevealGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" stagger={0.1} direction="up">
            {t.reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-neon-primary group-hover:text-primary transition-colors relative z-[10]">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </ScrollRevealGroup>
        </div>
      </section>

      {/* CTA Section */}
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
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              <Button 
                size="lg"
                className="btn-cinematic text-white border-none px-8 py-6 text-lg"
                asChild
              >
                <Link to="/contact">
                  {t.ctaButtonPrimary}
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="glass border-primary/30 hover:border-primary/50 px-8 py-6 text-lg"
                asChild
              >
                <Link to="/portfolio">
                  {t.ctaButtonSecondary}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
