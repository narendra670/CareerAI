import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, TrendingUp, CheckCircle2, Star, Zap,
} from 'lucide-react';

const FIELD_MAPPING = {
  'Web Development': { icon: '💻', color: 'from-blue-500 to-cyan-500', skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'HTML', 'CSS', 'Vue', 'Angular', 'PHP', 'Django'] },
  'Mobile Development': { icon: '📱', color: 'from-green-500 to-emerald-500', skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Dart', 'TypeScript'] },
  'Data Science': { icon: '📊', color: 'from-purple-500 to-pink-500', skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Data Analysis', 'Pandas', 'TensorFlow', 'Statistics'] },
  'AI & Machine Learning': { icon: '🤖', color: 'from-violet-500 to-purple-500', skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision'] },
  'Cloud & DevOps': { icon: '☁️', color: 'from-sky-500 to-blue-500', skills: ['AWS', 'Docker', 'Kubernetes', 'Azure', 'GCP', 'CI/CD', 'Terraform', 'Linux'] },
  'Cybersecurity': { icon: '🔒', color: 'from-red-500 to-orange-500', skills: ['Network Security', 'Penetration Testing', 'SIEM', 'Python', 'Linux', 'Cryptography'] },
  'UI/UX Design': { icon: '🎨', color: 'from-pink-500 to-rose-500', skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Graphic Design', 'Wireframing'] },
  'Product Management': { icon: '🚀', color: 'from-amber-500 to-yellow-500', skills: ['Product Management', 'Agile', 'Scrum', 'Analytics', 'Communication', 'Leadership', 'Strategy'] },
  'Digital Marketing': { icon: '📣', color: 'from-orange-500 to-red-500', skills: ['Marketing', 'SEO', 'Content Writing', 'Social Media', 'Analytics', 'Advertising', 'Email Marketing'] },
  'Finance & Analytics': { icon: '💰', color: 'from-emerald-500 to-green-500', skills: ['Financial Analysis', 'Accounting', 'SQL', 'Excel', 'Python', 'Data Analysis', 'Forecasting'] },
  'Healthcare Tech': { icon: '🏥', color: 'from-teal-500 to-cyan-500', skills: ['Python', 'Data Analysis', 'Machine Learning', 'SQL', 'Research', 'Biostatistics'] },
  'Content & Media': { icon: '✏️', color: 'from-fuchsia-500 to-pink-500', skills: ['Content Writing', 'Video Editing', 'Graphic Design', 'Social Media', 'SEO', 'Photography'] },
  'Education & Training': { icon: '📚', color: 'from-indigo-500 to-blue-500', skills: ['Teaching', 'Public Speaking', 'Communication', 'Curriculum Design', 'Mentoring'] },
  'Consulting': { icon: '💼', color: 'from-slate-500 to-gray-600', skills: ['Consulting', 'Leadership', 'Communication', 'Problem Solving', 'Strategy', 'Project Management'] },
  'Sales & Business Dev': { icon: '🤝', color: 'from-lime-500 to-green-500', skills: ['Sales', 'Negotiation', 'Communication', 'CRM', 'Lead Generation', 'Networking'] },
};

const INTEREST_FIELD_MAP = {
  'Web Development': ['Web Development'],
  'Mobile Apps': ['Mobile Development'],
  'Data Science': ['Data Science', 'Finance & Analytics'],
  'Artificial Intelligence': ['AI & Machine Learning', 'Data Science'],
  'Cloud Computing': ['Cloud & DevOps'],
  'Cybersecurity': ['Cybersecurity'],
  'UI/UX Design': ['UI/UX Design'],
  'Product Management': ['Product Management'],
  'Digital Marketing': ['Digital Marketing', 'Content & Media'],
  'Content Creation': ['Content & Media', 'Digital Marketing'],
  'Finance': ['Finance & Analytics'],
  'Healthcare': ['Healthcare Tech'],
  'Education': ['Education & Training'],
  'Entrepreneurship': ['Product Management', 'Consulting'],
  'Research': ['AI & Machine Learning', 'Data Science', 'Healthcare Tech'],
  'Consulting': ['Consulting', 'Sales & Business Dev'],
};

const EXPERIENCE_LABELS = {
  '0': 'Entry Level',
  '1': '1+ Years',
  '2': '2+ Years',
  '3': '3+ Years',
  '5': '5+ Years',
  '10': '10+ Years',
};

const CareerResults = () => {
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState(0);
  const [careerFields, setCareerFields] = useState([]);

  useEffect(() => {
    const assessmentData = sessionStorage.getItem('assessmentData');
    if (!assessmentData) {
      navigate('/assessment');
      return;
    }

    const data = JSON.parse(assessmentData);
    const fields = computeCareerFields(data);
    setCareerFields(fields);

    const timers = fields.map((_, i) =>
      setTimeout(() => setVisibleSections(i + 1), 400 + i * 250)
    );

    const summaryTimer = setTimeout(() => {
      setVisibleSections(fields.length + 1);
    }, 400 + fields.length * 250 + 300);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(summaryTimer);
    };
  }, [navigate]);

  const computeCareerFields = (data) => {
    const { skills, interests, experience } = data;
    const scores = {};

    Object.entries(FIELD_MAPPING).forEach(([field, config]) => {
      let score = 0;

      const skillMatches = skills.filter((s) =>
        config.skills.some((cs) => cs.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(cs.toLowerCase()))
      ).length;
      score += (skillMatches / Math.max(config.skills.length, 1)) * 50;

      const matchedInterests = interests.filter((interest) => {
        const mapped = INTEREST_FIELD_MAP[interest] || [];
        return mapped.includes(field);
      }).length;
      score += (matchedInterests / Math.max(interests.length, 1)) * 35;

      const exp = parseInt(experience) || 0;
      if (exp >= 3) score += 10;
      else if (exp >= 1) score += 5;

      if (score > 5) {
        scores[field] = { ...config, score: Math.min(Math.round(score), 99), field };
      }
    });

    return Object.values(scores)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const data = JSON.parse(sessionStorage.getItem('assessmentData') || '{}');
  const userSkills = data.skills || [];
  const expLabel = EXPERIENCE_LABELS[data.experience] || 'Entry Level';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30 py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Assessment Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Results
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Based on your skills, interests, and experience, here are your best career matches.
          </p>
        </div>

        {/* Assessment Summary */}
        {visibleSections >= careerFields.length + 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Your Profile Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-primary-50/50">
                <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {userSkills.slice(0, 5).map((s) => (
                      <span key={s} className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">{s}</span>
                    ))}
                    {userSkills.length > 5 && (
                      <span className="text-xs text-gray-400">+{userSkills.length - 5}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary-50/50">
                <Star className="w-5 h-5 text-secondary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Interests</p>
                  <div className="flex flex-wrap gap-1">
                    {(data.interests || []).slice(0, 3).map((i) => (
                      <span key={i} className="text-xs bg-secondary-100 text-secondary-700 px-2 py-0.5 rounded-full">{i}</span>
                    ))}
                    {(data.interests || []).length > 3 && (
                      <span className="text-xs text-gray-400">+{data.interests.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-green-50/50">
                <Zap className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Experience</p>
                  <p className="text-sm font-medium text-gray-700">{expLabel}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Career Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {careerFields.map((field, index) => (
            index < visibleSections && (
              <div
                key={field.field}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-all duration-300 opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${field.color} flex items-center justify-center text-2xl shadow-sm`}>
                      {field.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{field.field}</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-600 font-medium">{field.score}% match</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-12 h-12">
                    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={field.score >= 60 ? '#22c55e' : field.score >= 30 ? '#eab308' : '#ef4444'} strokeWidth="3" strokeDasharray={`${field.score}, 100`} className="transition-all duration-1000 ease-out" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700">{field.score}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {field.skills.slice(0, 5).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        {/* CTA */}
        {visibleSections >= careerFields.length + 1 && (
          <div className="text-center opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-gray-400 mt-3">See your saved careers and assessment history</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerResults;
