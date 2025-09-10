import { Profile, IProfile } from '../models/Profile';
import { requireAuth } from '../middleware/auth';
import { Context } from '../types';

export interface ProfileInput {
  bio?: string;
  courses: string[];
  major?: string;
  year?: number;
  studyStyle: string[];
  availability: Array<{
    day: string;
    timeSlots: Array<{
      start: string;
      end: string;
    }>;
  }>;
  location?: string;
  preferences: {
    groupSize: number;
    studyEnvironment: string[];
    subjectsOfInterest: string[];
  };
}

export const profileResolvers = {
  Mutation: {
    createProfile: async (_: any, { input }: { input: ProfileInput }, context: Context) => {
      const user = requireAuth(context);

      // Check if profile already exists
      const existingProfile = await Profile.findOne({ userId: user.id });
      if (existingProfile) {
        throw new Error('Profile already exists for this user');
      }

      const profile = new Profile({
        userId: user.id,
        ...input
      });

      await profile.save();

      return {
        id: profile._id.toString(),
        userId: profile.userId.toString(),
        bio: profile.bio,
        courses: profile.courses,
        major: profile.major,
        year: profile.year,
        studyStyle: profile.studyStyle,
        availability: profile.availability,
        location: profile.location,
        preferences: profile.preferences
      };
    },

    updateProfile: async (_: any, { input }: { input: ProfileInput }, context: Context) => {
      const user = requireAuth(context);

      const profile = await Profile.findOneAndUpdate(
        { userId: user.id },
        input,
        { new: true, upsert: true }
      );

      return {
        id: profile._id.toString(),
        userId: profile.userId.toString(),
        bio: profile.bio,
        courses: profile.courses,
        major: profile.major,
        year: profile.year,
        studyStyle: profile.studyStyle,
        availability: profile.availability,
        location: profile.location,
        preferences: profile.preferences
      };
    }
  }
};