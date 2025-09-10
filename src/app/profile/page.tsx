'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '../api/profile/route';

interface FormData {
  courses: string[];
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  studyStyle: string;
}

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
const TIME_SLOTS = [
  '9:00 AM - 11:00 AM',
  '11:00 AM - 1:00 PM',
  '1:00 PM - 3:00 PM',
  '3:00 PM - 5:00 PM',
  '5:00 PM - 7:00 PM',
  '7:00 PM - 9:00 PM',
];

const STUDY_STYLES = [
  'Visual learner',
  'Auditory learner',
  'Kinesthetic learner',
  'Reading/writing learner',
  'Group study',
  'Individual study',
];

export default function ProfilePage() {
  const [formData, setFormData] = useState<FormData>({
    courses: [''],
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    studyStyle: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isEditing, setIsEditing] = useState(true);

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const profile: UserProfile = await response.json();
          setFormData({
            courses: profile.courses.length > 0 ? profile.courses : [''],
            availability: profile.availability,
            studyStyle: profile.studyStyle,
          });
          setIsEditing(false);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    loadProfile();
  }, []);

  const addCourse = () => {
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, ''],
    }));
  };

  const removeCourse = (index: number) => {
    if (formData.courses.length > 1) {
      setFormData(prev => ({
        ...prev,
        courses: prev.courses.filter((_, i) => i !== index),
      }));
    }
  };

  const updateCourse = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.map((course, i) => i === index ? value : course),
    }));
  };

  const toggleTimeSlot = (day: string, timeSlot: string) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: prev.availability[day as keyof typeof prev.availability].includes(timeSlot)
          ? prev.availability[day as keyof typeof prev.availability].filter(slot => slot !== timeSlot)
          : [...prev.availability[day as keyof typeof prev.availability], timeSlot],
      },
    }));
  };

  const validateForm = (): string | null => {
    const validCourses = formData.courses.filter(course => course.trim() !== '');
    if (validCourses.length === 0) {
      return 'Please add at least one course';
    }

    if (!formData.studyStyle) {
      return 'Please select a preferred study style';
    }

    const hasAvailability = Object.values(formData.availability).some(slots => slots.length > 0);
    if (!hasAvailability) {
      return 'Please select at least one time slot for availability';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      setMessage({ type: 'error', text: error });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const method = isEditing ? 'POST' : 'PUT';
      const response = await fetch('/api/profile', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully!' });
        setIsEditing(false);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Failed to save profile' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Profile</h1>
          <p className="text-gray-600">Set up your study preferences to connect with the right study partners</p>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-sm font-medium ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Courses Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Courses</h2>
            <div className="space-y-3">
              {formData.courses.map((course, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={course}
                    onChange={(e) => updateCourse(index, e.target.value)}
                    placeholder="Enter course name (e.g., CS 101, Math 201)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                  {formData.courses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCourse(index)}
                      className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addCourse}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
              >
                + Add another course
              </button>
            </div>
          </div>

          {/* Study Style Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferred Study Style</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STUDY_STYLES.map((style) => (
                <label
                  key={style}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.studyStyle === style
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="studyStyle"
                    value={style}
                    checked={formData.studyStyle === style}
                    onChange={(e) => setFormData(prev => ({ ...prev, studyStyle: e.target.value }))}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.studyStyle === style
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {formData.studyStyle === style && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{style}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability Section */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
            <div className="space-y-4">
              {DAYS.map((day) => (
                <div key={day} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3 capitalize">{day}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {TIME_SLOTS.map((timeSlot) => (
                      <label
                        key={`${day}-${timeSlot}`}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all text-sm ${
                          formData.availability[day].includes(timeSlot)
                            ? 'border-blue-500 bg-blue-50 text-blue-900'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.availability[day].includes(timeSlot)}
                          onChange={() => toggleTimeSlot(day, timeSlot)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border-2 mr-3 flex items-center justify-center ${
                          formData.availability[day].includes(timeSlot)
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {formData.availability[day].includes(timeSlot) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium">{timeSlot}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}