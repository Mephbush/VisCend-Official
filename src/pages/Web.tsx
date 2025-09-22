import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ScrollReveal from "@/components/ui/scroll-reveal";
import ScrollRevealGroup from "@/components/ui/scroll-reveal-group";
import { 
  Eye, 
  ArrowRight,
  Globe,
  ShoppingCart,
  Briefcase,
  Smartphone,
  Code,
  Search
} from "lucide-react";

const Web = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();

  const content = {
    en: {
      heroTitle: "Web Solutions",
      heroSubtitle: "Digital Readiness for Modern Business",
      heroDescription: "We help businesses go digital with powerful, scalable web solutions that drive growth and deliver exceptional user experiences.",

      digitalReadinessTitle: "Digital Readiness",
      digitalReadinessDescription: "In today's digital-first world, having a strong online presence isn't optional, it's essential. We provide comprehensive digital transformation services that position your business for success in the digital landscape.",

      servicesTitle: "Our Web Services",
       services: [
         {
           icon: Briefcase,
           title: "Brand Identity & Corporate Websites",
           description: "Professional corporate websites and comprehensive digital identity design that establishes credibility and enhances your digital presence.",
           features: ["Logo & Visual Identity Design", "Comprehensive Corporate Websites", "SEO & Performance Optimization", "Content Strategy & Security"],
           technologies: ["React", "Next.js", "WordPress", "Headless CMS"],
           projects: ["Brand Identities", "Corporate Websites", "Digital Strategies"]
         },
        {
          icon: ShoppingCart,
          title: "E-Commerce Platforms",
          description: "Complete e-commerce solutions that turn visitors into customers with seamless shopping experiences.",
          features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"],
          technologies: ["Shopify", "WooCommerce", "Magento", "Custom Solutions"],
          projects: ["Online Stores", "B2B Platforms", "Marketplaces"]
        },
        {
          icon: Eye,
          title: "Portfolio Websites",
          description: "Stunning portfolio websites that showcase creative work and attract potential clients.",
          features: ["Gallery Systems", "Project Showcases", "Contact Forms", "Social Integration"],
          technologies: ["React", "Vue.js", "WordPress", "Webflow"],
          projects: ["Artist Portfolios", "Agency Showcases", "Personal Brands"]
        },
        {
          icon: Code,
          title: "Custom Web Applications",
          description: "Tailored web applications built to solve specific business challenges and streamline operations.",
          features: ["Custom Development", "API Integration", "Database Design", "User Management"],
          technologies: ["React", "Node.js", "Python", "PostgreSQL"],
          projects: ["Business Tools", "SaaS Platforms", "Internal Systems"]
        },
        {
          icon: Smartphone,
          title: "Responsive & Performance-First",
          description: "Designs and implementations optimized for mobile and desktop with performance and accessibility in mind.",
          features: ["Responsive Layout", "Touch Optimization", "Performance Tuning"],
          technologies: ["Progressive Web Apps", "Modern Web Standards"],
          projects: ["Mobile-Optimized Sites", "Progressive Web Apps"]
        },
         {
           icon: Search,
           title: "Performance & Security Optimization", 
           description: "Comprehensive services to optimize website performance, protect it, and increase visibility in search engines.",
           features: ["Load Speed Optimization", "Search Engine Optimization", "Security & Protection", "Performance Monitoring & Analytics"],
           technologies: ["Google Analytics", "CloudFlare", "SSL Certificates", "Performance Monitoring"],
           projects: ["Performance Optimization", "SEO Strategies", "Security Solutions"]
         }
      ],

      websiteTypesTitle: "Types of Websites We Create",
      websiteTypes: [
        {
          type: "Corporate",
          description: "Professional business websites that build trust and credibility",
          features: ["About Pages", "Service Descriptions", "Team Profiles", "Contact Information"]
        },
        {
          type: "E-Commerce",
          description: "Online stores that drive sales and revenue growth",
          features: ["Product Catalogs", "Shopping Carts", "Payment Processing", "Order Management"]
        },
        {
          type: "Portfolio",
          description: "Creative showcases that attract clients and opportunities",
          features: ["Project Galleries", "Case Studies", "Client Testimonials", "Contact Forms"]
        },
        {
          type: "Booking",
          description: "Appointment and reservation systems for service businesses",
          features: ["Calendar Integration", "Payment Processing", "Automated Notifications", "Customer Management"]
        },
        {
          type: "Educational",
          description: "Learning platforms and educational websites",
          features: ["Course Management", "Student Portals", "Progress Tracking", "Interactive Content"]
        },
        {
          type: "Non-Profit",
          description: "Websites that drive engagement and donations for causes",
          features: ["Donation Systems", "Event Management", "Volunteer Portals", "Impact Stories"]
        }
      ],

      processTitle: "Our Development Process",
      process: [
        {
          step: "01",
          title: "Discovery & Planning",
          description: "We understand your business goals, target audience, and technical requirements to create a comprehensive project plan."
        },
        {
          step: "02",
          title: "Design & Prototyping",
          description: "Creating wireframes, mockups, and interactive prototypes to visualize the final product before development."
        },
        {
          step: "03",
          title: "Development & Testing",
          description: "Building your website with clean, scalable code and thorough testing across all devices and browsers."
        },
        {
          step: "04",
          title: "Launch & Optimization",
          description: "Deploying your website with proper SEO setup and performance optimization for the best user experience."
        },
        {
          step: "05",
          title: "Maintenance & Support",
          description: "Ongoing support, updates, and maintenance to ensure your website stays secure and performs optimally."
        }
      ],

      ctaTitle: "Ready to Go Digital?",
      ctaDescription: "Transform your business with a powerful web presence",
      ctaButton: "Start Your Web Project"
    },
    ar: {
      heroTitle: "حلول الويب",
      heroSubtitle: "الجاهزية الرقمية للأعمال الحديثة",
      heroDescription: "نساعد الشركات على التحول الرقمي من خلال حلول ويب قوية وقابلة للتطوير تدفع النمو وتوفر تجارب مستخدم استثنائية.",

      digitalReadinessTitle: "الجاهزية الرقمية",
      digitalReadinessDescription: "في عالم اليوم الذي يعطي الأولوية للرقمية، وجود حضور قوي على الإنترنت ليس اختياريا، إنه ضروري. نحن نقدم خدمات التحول الرقمي الشاملة التي تضع عملك في موقع النجاح في المشهد الرقمي.",

      servicesTitle: "خدمات الويب لدينا",
       services: [
         {
           icon: Briefcase,
           title: "تصميم الهوية الرقمية والمواقع المؤسسية",
           description: "مواقع شركات احترافية وتصميم هوية رقمية شاملة تؤسس المصداقية وتعزز حضورك الرقمي.",
           features: ["تصميم الشعار والهوية البصرية", "مواقع مؤسسية متكاملة", "تحسين محركات البحث والأداء", "استراتيجية المحتوى والأمان"],
           technologies: ["React", "Next.js", "WordPress", "Headless CMS"],
           projects: ["هويات العلامات التجارية", "المواقع المؤسسية", "الاستراتيجيات الرقمية"]
         },
        {
          icon: ShoppingCart,
          title: "منصات التجارة الإلكترونية",
          description: "حلول تجارة إلكترونية متكاملة تحول الزوار إلى عملاء بتجربة تسوق سلسة.",
          features: ["عربة التسوق", "بوابات الدفع", "إدارة المخزون", "تتبع الطلبات"],
          technologies: ["Shopify", "WooCommerce", "Magento", "حلول مخصصة"],
          projects: ["متاجر إلكترونية", "منصات B2B", "أسواق إلكترونية"]
        },
        {
          icon: Eye,
          title: "مواقع المعارض",
          description: "مواقع معارض مذهلة تعرض الأعمال الإبداعية وتجذب العملاء المحتملين.",
          features: ["أنظمة المعارض", "عرض المشاريع", "نماذج الاتصال", "التكامل الاجتماعي"],
          technologies: ["React", "Vue.js", "WordPress", "Webflow"],
          projects: ["معارض الفنانين", "عروض الوكالات", "العلامات التجارية الشخصية"]
        },
        {
          icon: Code,
          title: "تطبيقات ويب مخصصة",
          description: "تطبيقات ويب مصممة خصيصاً لحل تحديات العمل المحددة وتبسيط العمليات.",
          features: ["التطوير المخصص", "تكامل API", "تصميم قواعد البيانات", "إدارة المستخدمين"],
          technologies: ["React", "Node.js", "Python", "PostgreSQL"],
          projects: ["أدوات العمل", "منصات SaaS", "أنظمة داخلية"]
        },
        {
          icon: Smartphone,
          title: "التصميم المحمول أولاً",
          description: "تصاميم محسنة للهواتف المحمولة تضمن تجارب مستخدم مثالية عبر جميع الأجهزة وأحجام الشاشات.",
          features: ["تخطيط متجاوب", "تحسين اللمس", "تحميل سريع", "تجربة شبيهة بالتطبيقات"],
          technologies: ["تطبيقات الويب التقدمية", "React Native", "Flutter", "Ionic"],
          projects: ["مواقع محمولة", "تطبيقات الويب التقدمية", "تطبيقات هجينة"]
        },
         {
           icon: Search,
           title: "تحسين الأداء والأمان الرقمي",
           description: "خدمات شاملة لتحسين أداء الموقع وحمايته وزيادة الرؤية في محركات البحث.",
           features: ["تحسين سرعة التحميل", "تحسين محركات البحث", "الأمان والحماية", "مراقبة الأداء والتحليلات"],
           technologies: ["Google Analytics", "CloudFlare", "SSL Certificates", "Performance Monitoring"],
           projects: ["تحسين الأداء", "استراتيجيات SEO", "حلول الأمان"]
         }
      ],

      websiteTypesTitle: "أنواع المواقع التي ننشئها",
      websiteTypes: [
        {
          type: "الشركات",
          description: "مواقع أعمال احترافية تبني الثقة والمصداقية",
          features: ["صفحات حول الشركة", "أوصاف الخدمات", "ملفات الفريق", "معلومات الاتصال"]
        },
        {
          type: "التجارة الإلكترونية",
          description: "متاجر إلكترونية تدفع المبيعات ونمو الإيرادات",
          features: ["فهارس المنتجات", "عربات التسوق", "معالجة الدفع", "إدارة الطلبات"]
        },
        {
          type: "المعارض",
          description: "عروض إبداعية تجذب العملاء والفرص",
          features: ["معارض المشاريع", "دراسات الحالة", "شهادات العملاء", "نماذج الاتصال"]
        },
        {
          type: "الحجوزات",
          description: "أنظمة مواعيد وحجوزات لشركات الخدمات",
          features: ["تكامل التقويم", "معالجة الدفع", "إشعارات آلية", "إدارة العملاء"]
        },
        {
          type: "التعليمية",
          description: "منصات تعلم ومواقع تعليمية",
          features: ["إدارة الدورات", "بوابات الطلاب", "تتبع التقدم", "محتوى تفاعلي"]
        },
        {
          type: "غير الربحية",
          description: "مواقع تدفع المشاركة والتبرعات للقضايا",
          features: ["أنظمة التبرع", "إدارة الأحداث", "بوابات المتطوعين", "قصص الأثر"]
        }
      ],

      processTitle: "عملية التطوير لدينا",
      process: [
        {
          step: "01",
          title: "الاكتشاف والتخطيط",
          description: "نفهم أهداف عملك والجمهور المستهدف والمتطلبات التقنية لإنشاء خطة مشروع شاملة."
        },
        {
          step: "02",
          title: "التصميم والنماذج الأولية",
          description: "إنشاء مخططات ونماذج أولية ونماذج تفاعلية لتصور المنتج النهائي قبل التطوير."
        },
        {
          step: "03",
          title: "التطوير والاختبار",
          description: "بناء موقعك بكود نظيف وقابل للتطوير واختبار شامل عبر جميع الأجهزة والمتصفحات."
        },
        {
          step: "04",
          title: "الإطلاق والتحسين",
          description: "نشر موقعك مع إعداد SEO مناسب وتحسين الأداء لأفضل تجربة مستخدم."
        },
        {
          step: "05",
          title: "الصيانة والدعم",
          description: "دعم وتحديثات وصيانة مستمرة لضمان بقاء موقعك آمنا ويعمل بشكل مثالي."
        }
      ],

      ctaTitle: "هل أنت مستعد للتحول الرقمي؟",
      ctaDescription: "حول عملك بحضور ويب قوي",
      ctaButton: "ابدأ مشروع الويب الخاص بك"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ScrollReveal direction="up">
        <section className="py-24 hero-pattern">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal delay={0.1}>
                <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-secondary/20 mb-8">
                  <Eye className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm font-medium text-neon-secondary">
                    Digital Solutions
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient-secondary animate-gradient-shift bg-[length:200%_auto]">
                    {t.heroTitle}
                  </span>
                </h1>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <p className="text-2xl md:text-3xl font-light text-neon-secondary mb-8">
                  {t.heroSubtitle}
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t.heroDescription}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Digital Readiness */}
      <ScrollReveal direction="up">
        <section className="py-24 bg-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-secondary">
                  {t.digitalReadinessTitle}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.digitalReadinessDescription}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Our Expertise Highlights: Frontend / Backend / DB / Security */}
      <ScrollReveal direction="up">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <ScrollReveal delay={0.1}>
                  <h3 className="text-3xl font-semibold text-gradient-primary">{language === 'ar' ? 'ماذا نتعامل معه' : 'What we handle'}</h3>
                </ScrollReveal>
                <ScrollReveal delay={0.2}>
                  <p className="text-muted-foreground max-w-2xl mx-auto mt-3">
                    {language === 'ar'
                      ? 'نغطي كافة طبقات الحلول: واجهة المستخدم، الخوادم، قواعد البيانات، والأمن. نبني أنظمة متكاملة قابلة للتوسع.'
                      : 'We cover all layers: frontend, backend, databases and security. We build integrated, scalable systems.'}
                  </p>
                </ScrollReveal>
              </div>

              <ScrollRevealGroup className="grid md:grid-cols-4 gap-6" stagger={0.1} direction="up">
                <div className="glass p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-primary mb-3">Frontend</div>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تصميم تفاعلي، أداء مُحسّن، وتجربة مستخدم متقدمة' : 'Interactive UI, optimized performance, advanced UX'}</p>
                </div>

                <div className="glass p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-primary mb-3">Backend</div>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'خدمات API مرنة، هندسة سحابية، وعمليات متكاملة' : 'Flexible APIs, cloud architecture, and integrated operations'}</p>
                </div>

                <div className="glass p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-primary mb-3">Databases</div>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'تصميم قواعد بيانات، أداء واستعادة بيانات موثوقة' : 'Database design, performance and reliable data retrieval'}</p>
                </div>

                <div className="glass p-6 text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl font-bold text-primary mb-3">Security</div>
                  <p className="text-sm text-muted-foreground">{language === 'ar' ? 'أفضل ممارسات الأمان، تشفير، وإدارة وصول' : 'Best security practices, encryption and access control'}</p>
                </div>
              </ScrollRevealGroup>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Services Grid */}
      <ScrollReveal direction="up">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-secondary">
                  {t.servicesTitle}
                </h2>
              </ScrollReveal>
            </div>

            <ScrollRevealGroup className="grid lg:grid-cols-2 gap-8" stagger={0.15} direction="up">
              {t.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={index} 
                    className="glass border-border/20 hover:border-secondary/30 transition-all duration-300 group hover:scale-105"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 rounded-full bg-gradient-to-br from-secondary to-accent">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-neon-secondary group-hover:text-secondary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-secondary mb-3">Key Features:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {service.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <div className="w-1 h-1 bg-secondary rounded-full" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-accent mb-3">Technologies:</h4>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {service.technologies.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </ScrollRevealGroup>
          </div>
        </section>
      </ScrollReveal>

      {/* Website Types */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-secondary">
              {t.websiteTypesTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.websiteTypes.map((type, index) => (
              <Card 
                key={index} 
                className="glass border-border/20 hover:border-secondary/30 transition-all duration-300 group hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-neon-secondary group-hover:text-secondary transition-colors mb-3">
                    {type.type}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {type.description}
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-secondary rounded-full" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ScrollReveal direction="up">
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-secondary">
                  {t.processTitle}
                </h2>
              </ScrollReveal>
            </div>

            <div className="max-w-4xl mx-auto">
              <ScrollRevealGroup stagger={0.15} direction="up">
                {t.process.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-6 mb-12"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-neon-secondary mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollRevealGroup>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal direction="up">
        <section className="py-24 hero-pattern">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient-secondary animate-gradient-shift bg-[length:200%_auto]">
                    {t.ctaTitle}
                  </span>
                </h2>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                  {t.ctaDescription}
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.3}>
                <Button 
                  size="lg"
                  className="btn-web-enhanced text-white border-none px-8 py-6 text-lg group relative overflow-hidden"
                  asChild
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <span className="relative z-10">{t.ctaButton}</span>
                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-accent/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default Web;
