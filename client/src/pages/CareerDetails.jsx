import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import userService from '../services/userService';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import {
  ArrowLeft, Bookmark, MapPin, DollarSign, TrendingUp,
  GraduationCap, CheckCircle2, XCircle, Sparkles, Zap, Target,
} from 'lucide-react';

const CareerDetails = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: careerData }, profileData] = await Promise.all([
          api.get(`/careers/${id}`),
          userService.getProfile().catch(() => null),
        ]);
        setCareer(careerData);
        if (profileData) {
          setProfile(profileData);
          setSaved(
            (profileData.savedCareers || []).some((c) => c._id === id || c === id)
          );
        }
      } catch (error) {
        console.error('Failed to load career:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async () => {
    try {
      await userService.saveCareer(id);
      setSaved(!saved);
      toast.success(saved ? 'Career removed from saved' : 'Career saved!');
    } catch (error) {
      toast.error('Failed to save career');
    }
  };

  if (loading) return <Loading />;

  if (!career) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Career not found</h2>
          <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 font-medium">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const userSkills = profile?.skills || [];
  const userInterests = profile?.interests || [];
  const experience = profile?.experience || 0;

  const matchedSkills = career.requiredSkills?.filter((cs) =>
    userSkills.some((s) => s.toLowerCase().includes(cs.toLowerCase()) || cs.toLowerCase().includes(s.toLowerCase()))
  ) || [];

  const missingSkills = career.requiredSkills?.filter((cs) =>
    !userSkills.some((s) => s.toLowerCase().includes(cs.toLowerCase()) || cs.toLowerCase().includes(s.toLowerCase()))
  ) || [];

  const skillPercentage = career.requiredSkills?.length
    ? Math.round((matchedSkills.length / career.requiredSkills.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <img
            src={career.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80'}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-blue-200 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-3">
                {career.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{career.title}</h1>
              <p className="text-blue-100 max-w-2xl">{career.description}</p>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0">
              <button
                onClick={handleSave}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  saved
                    ? 'bg-white text-primary-700'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Salary Range</p>
              <p className="font-semibold text-gray-900">
                ${(career.salaryRange?.min || 0).toLocaleString()} - ${(career.salaryRange?.max || 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Growth Rate</p>
              <p className="font-semibold text-gray-900">{career.growthRate}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100 flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Work Environment</p>
              <p className="font-semibold text-gray-900">{career.workEnvironment}</p>
            </div>
          </div>
        </div>

        {/* Personalized Fit Analysis */}
        <div className="bg-gradient-to-br from-primary-50/50 to-secondary-50/30 rounded-2xl border border-primary-100/50 p-6 md:p-8 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">Your Personal Fit</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Skill Breakdown */}
            <div className="bg-white/80 rounded-xl p-5 border border-white">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-primary-600" />
                <h3 className="text-sm font-semibold text-gray-900">Skill Breakdown</h3>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>{matchedSkills.length} of {career.requiredSkills?.length || 0} matched</span>
                  <span className="font-bold text-gray-700">{skillPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ease-out ${
                      skillPercentage >= 60 ? 'bg-green-500' : skillPercentage >= 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${skillPercentage}%` }}
                  />
                </div>
              </div>

              {matchedSkills.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-green-600 mb-1.5">Matched Skills</p>
                  <div className="space-y-1">
                    {matchedSkills.map((s) => (
                      <div key={s} className="flex items-center gap-1.5 text-xs text-green-700">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {missingSkills.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-1.5">Skills to Develop</p>
                  <div className="space-y-1">
                    {missingSkills.map((s) => (
                      <div key={s} className="flex items-center gap-1.5 text-xs text-gray-500">
                        <XCircle className="w-3.5 h-3.5 shrink-0" /> {s}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Growth & Opportunity */}
            <div className="bg-white/80 rounded-xl p-5 border border-white">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-semibold text-gray-900">Growth & Opportunity</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Growth Outlook</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                    career.growthRate === 'High' ? 'bg-green-100 text-green-700' :
                    career.growthRate === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <TrendingUp className="w-3 h-3" /> {career.growthRate} Growth
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Salary Potential</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${(career.salaryRange?.min || 0).toLocaleString()}
                    <span className="text-xs font-normal text-gray-500"> - </span>
                    ${(career.salaryRange?.max || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Work Environment</p>
                  <p className="text-sm font-medium text-gray-700">{career.workEnvironment}</p>
                </div>

                {experience === 0 && career.growthRate === 'High' && (
                  <div className="bg-blue-50 text-blue-700 text-xs px-3 py-2 rounded-lg">
                    Great entry-level opportunity in a growing field
                  </div>
                )}
              </div>
            </div>
          </div>

          {userInterests.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-medium text-gray-400 mb-2">Your Interests</p>
              <div className="flex flex-wrap gap-1.5">
                {userInterests.map((interest) => (
                  <span key={interest} className="text-xs bg-secondary-50 text-secondary-700 px-2 py-0.5 rounded-full border border-secondary-100">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Required Skills */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2">
            {career.requiredSkills?.map((skill) => {
              const isMatched = matchedSkills.includes(skill);
              return (
                <span
                  key={skill}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    isMatched
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-primary-50 text-primary-700 border border-primary-100'
                  }`}
                >
                  {isMatched && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1" />}
                  {skill}
                </span>
              );
            })}
          </div>
        </div>

        {/* Education */}
        {career.educationRequired && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" /> Education Requirements
            </h2>
            <p className="text-gray-600">{career.educationRequired}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDetails;
