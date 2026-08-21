import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillSelector from '../components/SkillSelector';
import toast from 'react-hot-toast';
import {
  ClipboardCheck, ArrowRight, ArrowLeft, Briefcase, Brain, Code,
  Sparkles, Target, CheckCircle2, Lightbulb, Rocket, Star, Zap,
  BarChart3, GraduationCap, Award, TrendingUp,
} from 'lucide-react';

const INTEREST_OPTIONS = [
  { name: 'Web Development', icon: '💻', desc: 'Build websites & web apps' },
  { name: 'Mobile Apps', icon: '📱', desc: 'Create iOS & Android apps' },
  { name: 'Data Science', icon: '📊', desc: 'Analyze data & find insights' },
  { name: 'Artificial Intelligence', icon: '🤖', desc: 'Build smart systems' },
  { name: 'Cloud Computing', icon: '☁️', desc: 'Design cloud infrastructure' },
  { name: 'Cybersecurity', icon: '🔒', desc: 'Protect digital assets' },
  { name: 'UI/UX Design', icon: '🎨', desc: 'Design beautiful interfaces' },
  { name: 'Product Management', icon: '🚀', desc: 'Lead product strategy' },
  { name: 'Digital Marketing', icon: '📣', desc: 'Grow brands online' },
  { name: 'Content Creation', icon: '✏️', desc: 'Create engaging content' },
  { name: 'Finance', icon: '💰', desc: 'Manage money & investments' },
  { name: 'Healthcare', icon: '🏥', desc: 'Improve health outcomes' },
  { name: 'Education', icon: '📚', desc: 'Teach & inspire others' },
  { name: 'Entrepreneurship', icon: '💡', desc: 'Build your own business' },
  { name: 'Research', icon: '🔬', desc: 'Advance human knowledge' },
  { name: 'Consulting', icon: '💼', desc: 'Solve business problems' },
];

const EXPERIENCE_OPTIONS = [
  { value: '0', label: 'Entry Level', sublabel: '0 years', desc: 'Fresh graduate or career changer looking to break in', icon: <Rocket className="w-5 h-5" />, color: 'from-emerald-400 to-teal-500' },
  { value: '1', label: 'Junior', sublabel: '1+ years', desc: 'Some professional experience, building foundations', icon: <Target className="w-5 h-5" />, color: 'from-sky-400 to-cyan-500' },
  { value: '2', label: 'Mid-Level', sublabel: '2+ years', desc: 'Solid experience, ready for more responsibility', icon: <BarChart3 className="w-5 h-5" />, color: 'from-indigo-400 to-violet-500' },
  { value: '3', label: 'Senior', sublabel: '3+ years', desc: 'Experienced professional, potential for leadership', icon: <Award className="w-5 h-5" />, color: 'from-violet-400 to-purple-500' },
  { value: '5', label: 'Lead', sublabel: '5+ years', desc: 'Deep expertise, mentoring others, driving strategy', icon: <Star className="w-5 h-5" />, color: 'from-amber-400 to-orange-500' },
  { value: '10', label: 'Expert', sublabel: '10+ years', desc: 'Industry veteran, shaping teams and organizations', icon: <GraduationCap className="w-5 h-5" />, color: 'from-rose-400 to-pink-500' },
];

const SKILL_TIPS = [
  'Add both technical skills (Python, React) and soft skills (Leadership, Communication)',
  'Be honest — accurate skills lead to better career matches',
  'Include tools you use daily (Git, Figma, AWS)',
];

const Assessment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [animDir, setAnimDir] = useState('right');
  const [data, setData] = useState({
    skills: [],
    interests: [],
    experience: '0',
  });

  const handleNext = () => {
    if (step === 1 && data.skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    setAnimDir('right');
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    setAnimDir('left');
    if (step > 1) setStep(step - 1);
  };

  const toggleInterest = (interest) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    if (data.skills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    setLoading(true);
    try {
      sessionStorage.setItem('assessmentData', JSON.stringify(data));
      toast.success('Assessment complete!');
      navigate('/career-results');
    } catch (error) {
      toast.error('Failed to save assessment');
    } finally {
      setLoading(false);
    }
  };

  const progress = (step / 3) * 100;

  // ───────────────── LOADING STATE ─────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 flex items-center justify-center relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative text-center px-6">
          <div className="relative w-28 h-28 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-400 animate-spin" />
            <div
              className="absolute inset-3 rounded-full border-[3px] border-transparent border-t-violet-400 animate-spin"
              style={{ animationDirection: 'reverse', animationDuration: '1.4s' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight mb-3">
            Analyzing Your Profile
          </h2>
          <p className="text-indigo-200/80 mb-8 max-w-md mx-auto text-lg font-light leading-relaxed">
            Our AI is matching your skills and interests with the best career opportunities…
          </p>

          <div className="flex justify-center gap-2.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      {/* ───────────────── HERO HEADER ───────────────── */}
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-lg">
              <ClipboardCheck className="w-7 h-7 text-indigo-200" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Career Assessment
              </h1>
              <p className="text-indigo-200/70 text-sm mt-0.5">
                3 simple steps to discover your perfect career path
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {[
              { id: 1, label: 'Skills', icon: <Code className="w-4 h-4" /> },
              { id: 2, label: 'Interests', icon: <Briefcase className="w-4 h-4" /> },
              { id: 3, label: 'Experience', icon: <Brain className="w-4 h-4" /> },
            ].map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 sm:gap-3 flex-1">
                <div
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-300 ${
                    step >= s.id
                      ? 'bg-white/15 text-white shadow-inner'
                      : 'bg-white/5 text-white/40'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      step > s.id
                        ? 'bg-emerald-400 text-emerald-950'
                        : step === s.id
                        ? 'bg-white text-indigo-700 shadow-md'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {step > s.id ? <CheckCircle2 className="w-4 h-4" /> : s.id}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{s.label}</span>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                      step > s.id ? 'bg-emerald-400' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-5 bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(52,211,153,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ───────────────── CONTENT ───────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              key={step}
              className={`bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 md:p-8 ${
                animDir === 'right'
                  ? 'animate-[fadeInRight_0.4s_ease-out_forwards]'
                  : 'animate-[fadeInLeft_0.4s_ease-out_forwards]'
              }`}
            >
              {/* Step 1: Skills */}
              {step === 1 && (
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-500/25">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Your Skills
                      </h2>
                      <p className="text-sm text-slate-500">What are you good at?</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-7 mt-4 leading-relaxed">
                    Select the skills you currently possess. These will be matched against
                    career requirements to find your best fits.
                  </p>
                  <SkillSelector
                    selectedSkills={data.skills}
                    onChange={(skills) => setData((prev) => ({ ...prev, skills }))}
                    maxSkills={15}
                  />
                </div>
              )}

              {/* Step 2: Interests */}
              {step === 2 && (
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-violet-500/25">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Your Interests
                      </h2>
                      <p className="text-sm text-slate-500">What excites you?</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-7 mt-4 leading-relaxed">
                    Choose areas that genuinely interest you. We’ll weight these alongside
                    your skills for better career matching.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {INTEREST_OPTIONS.map((interest) => {
                      const selected = data.interests.includes(interest.name);
                      return (
                        <button
                          key={interest.name}
                          onClick={() => toggleInterest(interest.name)}
                          className={`group relative flex items-center gap-3.5 p-4 rounded-2xl border-2 text-left transition-all duration-250 ${
                            selected
                              ? 'bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-100'
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm'
                          }`}
                        >
                          <span className="text-2xl shrink-0 transition-transform duration-300 group-hover:scale-110">
                            {interest.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-semibold ${
                                selected ? 'text-indigo-700' : 'text-slate-900'
                              }`}
                            >
                              {interest.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {interest.desc}
                            </p>
                          </div>
                          {selected && (
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 mt-4 font-medium">
                    {data.interests.length} interest{data.interests.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}

              {/* Step 3: Experience */}
              {step === 3 && (
                <div>
                  <div className="flex items-center gap-4 mb-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Experience Level
                      </h2>
                      <p className="text-sm text-slate-500">How much experience do you have?</p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm mb-7 mt-4 leading-relaxed">
                    Your experience level helps us recommend roles that match your career stage.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {EXPERIENCE_OPTIONS.map((opt) => {
                      const selected = data.experience === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => setData((prev) => ({ ...prev, experience: opt.value }))}
                          className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-250 ${
                            selected
                              ? 'bg-indigo-50 border-indigo-400 shadow-md shadow-indigo-100'
                              : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm'
                          }`}
                        >
                          <div
                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${opt.color} flex items-center justify-center text-white shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105`}
                          >
                            {opt.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p
                                className={`text-sm font-semibold ${
                                  selected ? 'text-indigo-700' : 'text-slate-900'
                                }`}
                              >
                                {opt.label}
                              </p>
                              <span className="text-xs text-slate-400 font-medium">
                                {opt.sublabel}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1 leading-snug">
                              {opt.desc}
                            </p>
                          </div>
                          {selected && (
                            <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-7">
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="group flex items-center gap-2 px-6 py-3.5 border-2 border-slate-200 rounded-2xl text-slate-700 font-semibold hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-2xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="group flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4.5 h-4.5" />
                  Get My Recommendations
                </button>
              )}
            </div>
          </div>

          {/* ───────────────── SIDEBAR ───────────────── */}
          <div className="hidden lg:block space-y-5">
            {/* Progress Summary */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 p-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5">
                Your Progress
              </h3>
              <div className="space-y-4">
                {[
                  {
                    active: step >= 1,
                    done: data.skills.length > 0,
                    icon: <Code className="w-4 h-4" />,
                    label: 'Skills',
                    value: `${data.skills.length} selected`,
                    bg: 'bg-sky-100 text-sky-600',
                  },
                  {
                    active: step >= 2,
                    done: data.interests.length > 0,
                    icon: <Briefcase className="w-4 h-4" />,
                    label: 'Interests',
                    value: `${data.interests.length} selected`,
                    bg: 'bg-violet-100 text-violet-600',
                  },
                  {
                    active: step >= 3,
                    done: data.experience !== '0',
                    icon: <Brain className="w-4 h-4" />,
                    label: 'Experience',
                    value:
                      EXPERIENCE_OPTIONS.find((o) => o.value === data.experience)?.label ||
                      'Not set',
                    bg: 'bg-amber-100 text-amber-600',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 transition-opacity duration-300 ${
                      item.active ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        item.active ? item.bg : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-400">{item.value}</p>
                    </div>
                    {item.done && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-100/80 p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-slate-900">Tips for Best Results</h3>
              </div>
              <ul className="space-y-3">
                {SKILL_TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                    <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* What You’ll Get */}
            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl border border-indigo-100/80 p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">What You’ll Get</h3>
              <ul className="space-y-3.5">
                {[
                  { icon: <Target className="w-4 h-4" />, text: 'Top career field matches' },
                  { icon: <BarChart3 className="w-4 h-4" />, text: 'Skill gap analysis' },
                  { icon: <TrendingUp className="w-4 h-4" />, text: 'Salary & growth insights' },
                  { icon: <Sparkles className="w-4 h-4" />, text: 'Personalized reasoning' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                    <div className="w-8 h-8 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Optional keyframes (add to global CSS if preferred) */}
      <style>{`
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Assessment;