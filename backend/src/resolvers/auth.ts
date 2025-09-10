import { User } from '../models/User';
import { Profile } from '../models/Profile';
import { generateToken, hashPassword, comparePassword } from '../utils/auth';
import { Context } from '../types';

export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: { input: RegisterInput }) => {
      const { email, password, firstName, lastName } = input;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName
      });

      await user.save();

      // Generate token
      const token = generateToken({ id: user._id.toString(), email: user.email });

      return {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          isVerified: user.isVerified,
          createdAt: user.createdAt.toISOString()
        }
      };
    },

    login: async (_: any, { input }: { input: LoginInput }) => {
      const { email, password } = input;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Check password
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      // Generate token
      const token = generateToken({ id: user._id.toString(), email: user.email });

      return {
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
          isVerified: user.isVerified,
          createdAt: user.createdAt.toISOString()
        }
      };
    }
  },

  Query: {
    me: async (_: any, __: any, context: Context) => {
      if (!context.user) {
        return null;
      }

      const user = await User.findById(context.user.id);
      if (!user) {
        return null;
      }

      return {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        isVerified: user.isVerified,
        createdAt: user.createdAt.toISOString()
      };
    }
  },

  User: {
    profile: async (parent: any) => {
      const profile = await Profile.findOne({ userId: parent.id });
      if (!profile) {
        return null;
      }

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