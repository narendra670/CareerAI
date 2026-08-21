import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';
import InputField from '../components/InputField';
import SkillSelector from '../components/SkillSelector';
import toast from 'react-hot-toast';
import { Save, Camera } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: [],
    interests: [],
    education: { degree: '', institution: '', year: '' },
    experience: 0,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await userService.getProfile();
        setFormData({
          name: profile.name || '',
          bio: profile.bio || '',
          skills: profile.skills || [],
          interests: profile.interests || [],
          education: profile.education || { degree: '', institution: '', year: '' },
          experience: profile.experience || 0,
        });
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        education: { ...prev.education, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await userService.updateProfile(formData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and preferences.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl font-bold">
                  {formData.name.charAt(0).toUpperCase() || 'U'}
                </div>
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
            <SkillSelector
              selectedSkills={formData.skills}
              onChange={(skills) => setFormData((prev) => ({ ...prev, skills }))}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interests</h3>
            <SkillSelector
              selectedSkills={formData.interests}
              onChange={(interests) => setFormData((prev) => ({ ...prev, interests }))}
              maxSkills={8}
            />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Degree"
                name="education.degree"
                value={formData.education.degree}
                onChange={handleChange}
                placeholder="B.S. Computer Science"
              />
              <InputField
                label="Institution"
                name="education.institution"
                value={formData.education.institution}
                onChange={handleChange}
                placeholder="MIT"
              />
              <InputField
                label="Graduation Year"
                name="education.year"
                value={formData.education.year}
                onChange={handleChange}
                placeholder="2024"
              />
              <InputField
                label="Years of Experience"
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="3"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
