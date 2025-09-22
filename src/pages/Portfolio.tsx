import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProjectModal } from "@/components/ui/project-modal";
import { supabase } from "@/integrations/supabase/client";
import { useOutletContext } from "react-router-dom";
import { 
  Play, 
  ExternalLink,
  Filter,
  Search,
  Calendar,
  Tag,
  Eye
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title_en: string;
  title_ar?: string;
  description_en?: string;
  description_ar?: string;
  category: string;
  service_type: string;
  image_url?: string;
  project_url?: string;
  technologies?: string[];
  featured: boolean;
  created_at: string;
}

const Portfolio = () => {
  const { language } = useOutletContext<{ language: "en" | "ar" }>();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const content = {
    en: {
      heroTitle: "Our Portfolio",
      heroSubtitle: "Creative Excellence in Action",
      heroDescription: "Explore our diverse collection of projects spanning visual productions and web solutions. Each project represents our commitment to quality and innovation.",

      filterTitle: "Filter Projects",
      searchPlaceholder: "Search projects...",
      allProjects: "All Projects",
      studioProjects: "Studio Projects",
      webProjects: "Web Projects",
      
      noResults: "No projects found matching your criteria.",
      
      categories: {
        all: "All Projects",
        studio: "Studio",
        web: "Web"
      },

      buttons: {
        viewProject: "View Project",
        watchDemo: "Watch Demo"
      }
    },
    ar: {
      heroTitle: "معرض أعمالنا",
      heroSubtitle: "التميز الإبداعي في العمل",
      heroDescription: "استكشف مجموعتنا المتنوعة من المشاريع التي تشمل الإنتاج المرئي وحلول الويب. كل مشروع يمثل التزامنا بالجودة والابتكار.",

      filterTitle: "تصفية المشاريع",
      searchPlaceholder: "البحث في المشاريع...",
      allProjects: "جميع المشاريع",
      studioProjects: "مشاريع الاستوديو",
      webProjects: "مشاريع الويب",
      
      noResults: "لم يتم العثور على مشاريع تطابق معاييرك.",
      
      categories: {
        all: "جميع المشاريع",
        studio: "الاستوديو",
        web: "الويب"
      },

      buttons: {
        viewProject: "عرض المشروع",
        watchDemo: "مشاهدة العرض التوضيحي"
      }
    }
  };

  const t = content[language];

  // Fetch portfolio items from Supabase
  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching portfolio items:', error);
        } else {
          setPortfolioItems(data || []);
          setFilteredItems(data || []);
        }
      } catch (error) {
        console.error('Error fetching portfolio items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Filter items based on category and search term
  useEffect(() => {
    let filtered = portfolioItems;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.technologies?.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  }, [portfolioItems, selectedCategory, searchTerm]);

  const getTitle = (item: PortfolioItem) => {
    return language === 'ar' && item.title_ar ? item.title_ar : item.title_en;
  };

  const getDescription = (item: PortfolioItem) => {
    return language === 'ar' && item.description_ar ? item.description_ar : item.description_en;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
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

      {/* Filter Section */}
      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 glass border-border/20"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                {[
                  { key: "all", label: t.categories.all },
                  { key: "studio", label: t.categories.studio },
                  { key: "web", label: t.categories.web }
                ].map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    className={
                      selectedCategory === category.key 
                        ? "btn-cinematic text-white border-none" 
                        : "glass border-border/20 hover:border-primary/30"
                    }
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Showing {filteredItems.length} of {portfolioItems.length} projects
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              {language === 'ar' ? 'مشاريع مميزة' : 'Featured Projects'}
            </h2>
            <p className="text-muted-foreground">
              {language === 'ar' 
                ? 'استكشف أحدث أعمالنا المتميزة' 
                : 'Explore our latest featured work'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Beyond the Horizon of Time - 3D Film */}
            <ProjectModal
              project={{
                id: "beyond-horizon",
                title: language === 'ar' ? 'ما وراء أفق الزمن' : 'Beyond the Horizon of Time',
                category: language === 'ar' ? 'الاستوديو' : 'Studio',
                description: language === 'ar' 
                  ? 'فيلم قصير ثلاثي الأبعاد يتبع رحلة سيارة بي إم دبليو عبر بوابة زمنية، حيث تتحول إلى باتموبايل وتدخل عالماً جديداً من الخيال والمغامرة'
                  : 'A 3D short film following a BMW\'s journey through a time portal, transforming into a Batmobile and entering a new world of fantasy and adventure',
                longDescription: language === 'ar'
                  ? 'عمل سينمائي ثلاثي الأبعاد متطور يجمع بين تقنيات الرسوم المتحركة المتقدمة والمؤثرات البصرية المذهلة. يحكي الفيلم قصة رحلة استثنائية عبر الزمن، حيث تصبح سيارة بي إم دبليو العادية جزءاً من مغامرة خيالية تحولها إلى مركبة الأبطال الخارقين الشهيرة "باتموبايل". العمل يعكس خبرتنا في إنتاج المحتوى المرئي عالي الجودة ويظهر قدرتنا على دمج التقنيات الحديثة مع السرد الإبداعي.'
                  : 'An advanced 3D cinematic work that combines cutting-edge animation techniques with stunning visual effects. The film tells the story of an extraordinary journey through time, where an ordinary BMW becomes part of a fantasy adventure that transforms it into the famous superhero vehicle "Batmobile". This work reflects our expertise in producing high-quality visual content and demonstrates our ability to merge modern techniques with creative storytelling.',
                embedCode: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/1deJM-7X9oo" title="VisCend - Beyond The Horizon of Time" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
                technologies: ["3D Animation", "VFX", "Motion Graphics", "Cinema 4D", "After Effects", "Premiere Pro"],
                date: "2024",
                type: language === 'ar' ? 'فيلم قصير ثلاثي الأبعاد' : '3D Short Film'
              }}
              language={language}
            >
              <Card className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                      <iframe 
                        className="absolute inset-0 w-full h-full rounded-t-lg"
                        src="https://www.youtube.com/embed/1deJM-7X9oo" 
                        title="VisCend - Beyond The Horizon of Time" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      />
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent/90 text-white">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Studio
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
                    <h3 className="text-xl font-bold text-neon-primary group-hover:text-primary transition-colors mb-3">
                      {language === 'ar' ? 'ما وراء أفق الزمن' : 'Beyond the Horizon of Time'}
                    </h3>
                    
                    <p className="text-sm text-secondary font-medium mb-3">
                      {language === 'ar' ? 'فيلم قصير ثلاثي الأبعاد' : '3D Short Film'}
                    </p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {language === 'ar' 
                        ? 'فيلم قصير ثلاثي الأبعاد يتبع رحلة سيارة بي إم دبليو عبر بوابة زمنية، حيث تتحول إلى باتموبايل وتدخل عالماً جديداً من الخيال والمغامرة'
                        : 'A 3D short film following a BMW\'s journey through a time portal, transforming into a Batmobile and entering a new world of fantasy and adventure'
                      }
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">3D Animation</Badge>
                        <Badge variant="secondary" className="text-xs">VFX</Badge>
                        <Badge variant="secondary" className="text-xs">Motion Graphics</Badge>
                        <Badge variant="secondary" className="text-xs">Cinema 4D</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {language === 'ar' ? '2024' : '2024'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ProjectModal>

            {/* Bella Vista Restaurant Website */}
            <ProjectModal
              project={{
                id: "bella-vista",
                title: language === 'ar' ? 'مطعم بيلا فيستا' : 'Bella Vista Restaurant',
                category: language === 'ar' ? 'الويب' : 'Web',
                description: language === 'ar' 
                  ? 'موقع إلكتروني أنيق لمطعم راقي يتميز بنظام حجوزات متطور وعرض تفاعلي للقائمة مع تجربة مستخدم استثنائية'
                  : 'An elegant website for a fine dining restaurant featuring an advanced reservation system and interactive menu display with exceptional user experience',
                longDescription: language === 'ar'
                  ? 'موقع إلكتروني شامل ومتطور لمطعم بيلا فيستا الراقي، يوفر تجربة رقمية متكاملة للضيوف. يتضمن الموقع نظام حجوزات ذكي يسمح للعملاء بحجز طاولاتهم بسهولة، وقائمة طعام تفاعلية تعرض الأطباق بطريقة جذابة مع الصور والأوصاف التفصيلية. التصميم يتميز بالأناقة والبساطة مع التركيز على تجربة المستخدم وسهولة التنقل، ويدعم الموقع عدة لغات ويعمل بكفاءة على جميع الأجهزة.'
                  : 'A comprehensive and advanced website for Bella Vista fine dining restaurant, providing an integrated digital experience for guests. The website includes a smart reservation system that allows customers to easily book their tables, and an interactive menu that displays dishes attractively with images and detailed descriptions. The design is characterized by elegance and simplicity with a focus on user experience and easy navigation. The website supports multiple languages and works efficiently on all devices.',
                imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                projectUrl: "https://rescend.netlify.app",
                technologies: ["React", "TypeScript", "Tailwind CSS", "Responsive Design", "Booking System", "Multi-language Support"],
                date: "2024",
                type: language === 'ar' ? 'موقع إلكتروني للمطاعم' : 'Restaurant Website'
              }}
              language={language}
            >
              <Card className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Bella Vista Restaurant" 
                      className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent/90 text-white">
                        Featured
                      </Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                        Web
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
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-neon-primary group-hover:text-primary transition-colors">
                        {language === 'ar' ? 'مطعم بيلا فيستا' : 'Bella Vista Restaurant'}
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <a 
                          href="https://rescend.netlify.app" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    
                    <p className="text-sm text-secondary font-medium mb-3">
                      {language === 'ar' ? 'موقع إلكتروني للمطاعم' : 'Restaurant Website'}
                    </p>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {language === 'ar' 
                        ? 'موقع إلكتروني أنيق لمطعم راقي يتميز بنظام حجوزات متطور وعرض تفاعلي للقائمة مع تجربة مستخدم استثنائية'
                        : 'An elegant website for a fine dining restaurant featuring an advanced reservation system and interactive menu display with exceptional user experience'
                      }
                    </p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">React</Badge>
                        <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                        <Badge variant="secondary" className="text-xs">Tailwind CSS</Badge>
                        <Badge variant="secondary" className="text-xs">Responsive Design</Badge>
                        <Badge variant="secondary" className="text-xs">Booking System</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {language === 'ar' ? '2024' : '2024'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ProjectModal>
          </div>

          {/* Coming Soon Hint */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              {language === 'ar' 
                ? 'المزيد من المشاريع المثيرة قادمة قريباً...' 
                : 'More exciting projects coming soon...'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-muted-foreground">
                {t.noResults}
              </h3>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="glass border-primary/30 hover:border-primary/50"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <Card 
                  key={item.id} 
                  className="glass border-border/20 hover:border-primary/30 transition-all duration-300 group hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={getTitle(item)}
                          className="aspect-video w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                      
                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-accent/90 text-white">
                            Featured
                          </Badge>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge className={`${
                          item.category === 'studio' 
                            ? 'bg-primary/20 text-primary border-primary/30' 
                            : 'bg-secondary/20 text-secondary border-secondary/30'
                        }`}>
                          {item.category === 'studio' ? 'Studio' : 'Web'}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-neon-primary group-hover:text-primary transition-colors">
                          {getTitle(item)}
                        </h3>
                        {item.project_url && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <a 
                              href={item.project_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                      
                      <p className="text-sm text-secondary font-medium mb-3">
                        {item.service_type}
                      </p>
                      
                      {getDescription(item) && (
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {getDescription(item)}
                        </p>
                      )}
                      
                      {/* Technologies */}
                      {item.technologies && item.technologies.length > 0 && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {item.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Date */}
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 hero-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="text-gradient-primary animate-gradient-shift bg-[length:200%_auto]">
                Ready to Create Your Next Project?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Let's bring your vision to life with our expertise and creativity
            </p>
            
            <Button 
              size="lg"
              className="btn-cinematic text-white border-none px-8 py-6 text-lg animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
              asChild
            >
              <a href="/contact">
                Start Your Project
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
