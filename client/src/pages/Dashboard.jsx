import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import Loading from '../components/Loading';
import {
  Bookmark, ArrowRight, ClipboardCheck,
  Sparkles, User, MapPin, DollarSign, ChevronRight,
  Rocket, Star, Zap, Briefcase, GraduationCap,
} from 'lucide-react';

const FIELD_ICONS = {
  Technology: <Zap className="w-5 h-5" />,
  Healthcare: <span className="text-lg">🏥</span>,
  Finance: <span className="text-lg">💰</span>,
  Education: <GraduationCap className="w-5 h-5" />,
  Engineering: <span className="text-lg">⚙️</span>,
  Creative: <span className="text-lg">🎨</span>,
  Business: <Briefcase className="w-5 h-5" />,
  Science: <span className="text-lg">🔬</span>,
  Legal: <span className="text-lg">⚖️</span>,
  Trades: <span className="text-lg">🔧</span>,
};

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile(data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const savedCareers = profile?.savedCareers || [];
  const skills = profile?.skills || [];
  const interests = profile?.interests || [];
  const experience = profile?.experience || 0;

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* ───────────────── WELCOME HERO ───────────────── */}
      <div className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-indigo-200" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Welcome back, {user?.name?.split(' ')[0]}!
                </h1>
                <p className="text-indigo-200/70 text-sm mt-0.5">
                  Here’s your career dashboard overview
                </p>
              </div>
            </div>

            <Link
              to="/assessment"
              className="group inline-flex items-center gap-2.5 bg-white text-indigo-700 px-6 py-3.5 rounded-2xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 shrink-0"
            >
              <ClipboardCheck className="w-5 h-5" />
              Take Assessment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { label: 'Saved Careers', value: savedCareers.length, icon: <Bookmark className="w-5 h-5" />, color: 'from-violet-400 to-fuchsia-500' },
              { label: 'Skills', value: skills.length, icon: <Zap className="w-5 h-5" />, color: 'from-sky-400 to-cyan-500' },
              { label: 'Interests', value: interests.length, icon: <Star className="w-5 h-5" />, color: 'from-emerald-400 to-teal-500' },
              { label: 'Experience', value: `${experience}+ yrs`, icon: <Briefcase className="w-5 h-5" />, color: 'from-amber-400 to-orange-500' },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3 shadow-lg`}>
                  {stat.icon}
                </div>
                <p className="text-2xl font-extrabold tracking-tight">{stat.value}</p>
                <p className="text-indigo-200/70 text-xs font-medium mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ───────────────── QUICK ACTIONS ───────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {[
            {
              to: '/assessment',
              icon: <ClipboardCheck className="w-6 h-6" />,
              label: 'Take Assessment',
              desc: 'Find your career match',
              color: 'from-sky-500 to-cyan-500',
            },
            {
              to: '/career-results',
              icon: <Sparkles className="w-6 h-6" />,
              label: 'Career Fields',
              desc: 'Explore best fields',
              color: 'from-amber-500 to-orange-500',
            },
            {
              to: '/profile',
              icon: <User className="w-6 h-6" />,
              label: 'Your Profile',
              desc: 'Update your info',
              color: 'from-emerald-500 to-teal-500',
            },
          ].map((action, i) => (
            <Link
              key={i}
              to={action.to}
              className="group bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 p-6 hover:shadow-2xl hover:shadow-indigo-100/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-13 h-13 w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                {action.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors">
                {action.label}
              </h3>
              <p className="text-sm text-slate-400 mt-1">{action.desc}</p>
            </Link>
          ))}
        </div>

        {/* ───────────────── MAIN CONTENT ───────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Careers */}
            {savedCareers.length > 0 ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-6 md:p-7 pb-0">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Saved Careers
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Careers you bookmarked for later
                  </p>
                </div>
                <div className="p-6 md:p-7 space-y-3">
                  {savedCareers.map((career) => (
                    <Link
                      key={career._id}
                      to={`/career/${career._id}`}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-indigo-200 hover:bg-indigo-50/40 transition-all duration-250 group"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg shrink-0 bg-indigo-100 text-indigo-700 group-hover:scale-105 transition-transform">
                        {FIELD_ICONS[career.category] || <Briefcase className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                          {career.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {career.workEnvironment}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <DollarSign className="w-3.5 h-3.5" />
                            ${(career.salaryRange?.min || 0).toLocaleString()} – $
                            {(career.salaryRange?.max || 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4.5 h-4.5 text-slate-300 group-hover:text-indigo-500 transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <ClipboardCheck className="w-9 h-9 text-indigo-600" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight">
                  No Saved Careers Yet
                </h3>
                <p className="text-slate-500 mb-7 max-w-sm mx-auto leading-relaxed">
                  Take the career assessment to discover fields that match your skills and interests, then save the ones you like.
                </p>
                <Link
                  to="/assessment"
                  className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white px-7 py-3.5 rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Rocket className="w-5 h-5" />
                  Start Assessment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>

          {/* ───────────────── RIGHT SIDEBAR ───────────────── */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                  Your Profile
                </h3>
                <Link
                  to="/profile"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
                >
                  Edit <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-13 h-13 w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{user?.name || 'User'}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{user?.email || ''}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div>
                    <p className="text-xs text-slate-400 mb-2 font-medium">Skills</p>
                    {skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {skills.slice(0, 5).map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full border border-indigo-100 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                        {skills.length > 5 && (
                          <span className="text-xs text-slate-400 self-center">+{skills.length - 5}</span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No skills added yet</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-2 font-medium">Interests</p>
                    {interests.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {interests.slice(0, 4).map((i) => (
                          <span
                            key={i}
                            className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full border border-violet-100 font-medium"
                          >
                            {i}
                          </span>
                        ))}
                        {interests.length > 4 && (
                          <span className="text-xs text-slate-400 self-center">+{interests.length - 4}</span>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-400">No interests added yet</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-slate-400 mb-1 font-medium">Experience</p>
                    <p className="text-sm font-semibold text-slate-800">{experience}+ years</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100/80 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <h3 className="font-bold text-slate-900">Pro Tips</h3>
              </div>
              <ul className="space-y-3">
                {[
                  'Retake the assessment periodically as your skills grow',
                  'Save interesting careers to compare later',
                  'Update your profile for more accurate matches',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;