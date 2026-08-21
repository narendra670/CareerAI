import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SUGGESTED_SKILLS = [
  'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'TypeScript',
  'Java', 'C++', 'AWS', 'Docker', 'Machine Learning', 'Data Analysis',
  'Project Management', 'Communication', 'Leadership', 'UI/UX Design',
  'Marketing', 'Sales', 'Financial Analysis', 'Graphic Design',
  'Video Editing', 'Content Writing', 'Public Speaking', 'Negotiation',
];

const SkillSelector = ({ selectedSkills = [], onChange, maxSkills = 10 }) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !selectedSkills.includes(trimmed) && selectedSkills.length < maxSkills) {
      onChange([...selectedSkills, trimmed]);
      setInputValue('');
    }
  };

  const removeSkill = (skill) => {
    onChange(selectedSkills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputValue);
    }
  };

  const availableSuggestions = SUGGESTED_SKILLS.filter(
    (s) => !selectedSkills.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-3">
        {selectedSkills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="hover:text-primary-900"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {selectedSkills.length < maxSkills && (
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {inputValue && availableSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {availableSuggestions.slice(0, 6).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-primary-50 flex items-center gap-2"
                >
                  <Plus className="w-3 h-3 text-primary-500" />
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-3">
        {availableSuggestions.slice(0, 8).map((skill) => (
          <button
            key={skill}
            onClick={() => addSkill(skill)}
            className="text-xs px-2.5 py-1 border border-gray-200 rounded-full hover:bg-primary-50 hover:border-primary-300 text-gray-600 transition-colors"
          >
            + {skill}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {selectedSkills.length}/{maxSkills} skills selected
      </p>
    </div>
  );
};

export default SkillSelector;
