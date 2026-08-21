import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ScrollReveal from '../components/ScrollReveal';
import {
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  BarChart3,
  Heart,
  Palette,
  Megaphone,
  Star,
  CheckCircle,
  Zap,
  ChevronRight,
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'AI-Powered Analysis',
      description:
        'Advanced algorithms analyze your skills, personality traits, and preferences to find careers that truly fit you.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Personalized Matching',
      description:
        'Get career recommendations tailored to your unique strengths, interests, and long-term aspirations.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Growth Insights',
      description:
        'Discover salary ranges, growth rates, and market demand for each career path in real time.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Community Driven',
      description:
        'Join thousands of professionals who found their dream careers and share experiences with peers.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Career Paths', icon: <Briefcase className="w-6 h-6" /> },
    { value: '50K+', label: 'Happy Users', icon: <Users className="w-6 h-6" /> },
    { value: '95%', label: 'Match Accuracy', icon: <BarChart3 className="w-6 h-6" /> },
    { value: '200+', label: 'Skill Categories', icon: <Sparkles className="w-6 h-6" /> },
  ];

  const categories = [
    {
      title: 'Technology',
      icon: <Zap className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
      count: '2,500+ careers',
    },
    {
      title: 'Healthcare',
      icon: <Heart className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80',
      count: '1,800+ careers',
    },
    {
      title: 'Finance',
      icon: <BarChart3 className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
      count: '1,200+ careers',
    },
    {
      title: 'Creative',
      icon: <Palette className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&q=80',
      count: '900+ careers',
    },
    {
      title: 'Education',
      icon: <GraduationCap className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
      count: '800+ careers',
    },
    {
      title: 'Marketing',
      icon: <Megaphone className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80',
      count: '700+ careers',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
      quote:
        'CareerAI helped me transition from marketing to software engineering. The AI matched my transferable skills perfectly. Best decision ever!',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    },
    {
      name: 'James Rodriguez',
      role: 'Data Scientist at Netflix',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
      quote:
        'I was stuck in a career rut. CareerAI showed me paths I never considered. Within 6 months, I landed my dream role in data science.',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    },
    {
      name: 'Priya Patel',
      role: 'UX Designer at Airbnb',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
      quote:
        'The personalized insights were spot on. CareerAI identified my creative strengths and guided me toward UX design. I love my job now!',
      rating: 5,
      bgImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-primary-100 selection:text-primary-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-primary-950 to-secondary-950 text-white overflow-hidden">
        {/* Background image with stronger overlay */}
        <div className="absolute inset-0 opacity-[0.07]">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Animated ambient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-16 left-8 w-80 h-80 bg-primary-500/20 rounded-full blur-[100px] animate-pulse" />
          <div
            className="absolute bottom-8 right-12 w-[28rem] h-[28rem] bg-secondary-500/15 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '1.8s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[90px] animate-pulse"
            style={{ animationDelay: '3s' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left content */}
            <div className="fade-in-up">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 mb-7 shadow-lg shadow-primary-500/10 animate-slide-down">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="text-sm font-medium text-blue-100 tracking-wide">
                  AI-Powered Career Intelligence
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Discover Your
                <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300">
                  Perfect Career
                </span>
              </h1>

              <p
                className="text-lg sm:text-xl text-blue-100/80 mb-9 max-w-lg leading-relaxed fade-in-up"
                style={{ animationDelay: '0.15s' }}
              >
                Leverage AI to find careers that match your skills, interests, and aspirations.
                Your dream job is just one assessment away.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 mb-10 fade-in-up"
                style={{ animationDelay: '0.3s' }}
              >
                <Link
                  to={user ? '/assessment' : '/signup'}
                  className="group relative inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-semibold text-base shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/25 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                >
                  Explore Careers
                </Link>
              </div>

              <div
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-blue-200/80 fade-in-up"
                style={{ animationDelay: '0.45s' }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                  <span>Free assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                  <span>No credit card needed</span>
                </div>
              </div>
            </div>

            {/* Right image + floating cards */}
            <div className="relative fade-in-up hidden md:block" style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-3xl blur-2xl opacity-60" />
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=700&q=80"
                  alt="Professional team collaborating"
                  className="relative rounded-3xl shadow-2xl w-full ring-1 ring-white/10 animate-scale-in"
                  style={{ animationDelay: '0.4s' }}
                />

                {/* Floating card 1 */}
                <div className="absolute -bottom-7 -left-7 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 border border-white/50 animate-float">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">Career Match</p>
                    <p className="text-emerald-600 font-bold text-base">98% Accuracy</p>
                  </div>
                </div>

                {/* Floating card 2 */}
                <div
                  className="absolute -top-5 -right-5 bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 border border-white/50 animate-float"
                  style={{ animationDelay: '1.1s' }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-800 font-semibold text-sm">Users Matched</p>
                    <p className="text-primary-600 font-bold text-base">50,000+</p>
                  </div>
                </div>

                {/* Floating card 3 */}
                <div
                  className="absolute top-1/2 -left-10 bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl flex items-center gap-2.5 border border-white/50 animate-float"
                  style={{ animationDelay: '2.2s' }}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-sm">4.9/5</p>
                    <p className="text-slate-500 text-xs">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} animation="scroll-scale-in" delay={index * 0.1}>
                <div className="text-center group cursor-default">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center text-primary-600 shadow-sm group-hover:from-primary-100 group-hover:to-primary-200 group-hover:shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-slate-900 group-hover:text-primary-600 transition-colors duration-300 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1.5 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-24 bg-slate-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scroll-fade-up">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-3">
                Features
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
                How CareerAI Works
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Three simple steps to discover careers that align with who you are and where you want to go.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-7 lg:gap-8">
            {features.map((feature, index) => (
              <ScrollReveal
                key={index}
                animation={index % 2 === 0 ? 'scroll-fade-left' : 'scroll-fade-right'}
                delay={index * 0.12}
              >
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100/80 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 group hover:-translate-y-1.5">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent group-hover:from-primary-900/50 transition-colors duration-500" />
                    <div className="absolute bottom-5 left-5 w-13 h-13 bg-white/95 backdrop-blur-sm rounded-2xl flex items-center justify-center text-primary-600 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-primary-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career Categories Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scroll-fade-up">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-3">
                Explore
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
                Browse Career Categories
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Explore thousands of career paths across diverse industries and find where you belong.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6">
            {categories.map((category, index) => (
              <ScrollReveal key={index} animation="scroll-scale-in" delay={index * 0.07}>
                <Link
                  to="/dashboard"
                  className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer block shadow-md hover:shadow-xl transition-shadow duration-500"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent group-hover:from-primary-950/85 transition-colors duration-500" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-primary-300 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </span>
                      <h3 className="text-white font-bold text-lg tracking-tight">{category.title}</h3>
                    </div>
                    <p className="text-slate-300 text-sm font-medium">{category.count}</p>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/15 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 group-hover:rotate-12">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-24 bg-gradient-to-br from-primary-50/70 via-white to-secondary-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="scroll-fade-up">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-3">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-5 tracking-tight">
                Loved by Professionals
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                See how CareerAI has transformed careers and helped people find their true calling.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-7 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollReveal key={index} animation="scroll-fade-up" delay={index * 0.15}>
                <div className="relative bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 group hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={testimonial.bgImage}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-center gap-3.5">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div>
                        <p className="font-semibold text-slate-900 text-sm tracking-tight">
                          {testimonial.name}
                        </p>
                        <p className="text-primary-600 text-xs font-medium mt-0.5">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-3 flex-1 flex flex-col">
                    <div className="flex items-center gap-1 mb-3.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-200"
                          style={{ transitionDelay: `${i * 40}ms` }}
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 leading-relaxed italic text-[15px]">
                      “{testimonial.quote}”
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/95 via-primary-900/90 to-secondary-950/95" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <ScrollReveal animation="scroll-fade-left">
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight">
                  Ready to Transform Your Career?
                </h2>
                <p className="text-blue-100/85 mb-10 leading-relaxed text-lg max-w-lg">
                  Join thousands of professionals who have discovered their ideal career paths.
                  Take our comprehensive assessment and get personalized recommendations today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to={user ? '/assessment' : '/signup'}
                    className="group relative inline-flex items-center justify-center gap-2.5 bg-white text-primary-700 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:bg-blue-50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-primary-50/0 via-primary-100/40 to-primary-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    Start Your Assessment
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="scroll-fade-right" delay={0.2}>
              <div className="relative hidden md:block">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl blur-xl" />
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team working together"
                  className="relative rounded-3xl shadow-2xl w-full ring-1 ring-white/15 hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;