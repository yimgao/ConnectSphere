"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const User_1 = require("../models/User");
const Profile_1 = require("../models/Profile");
const auth_1 = require("../utils/auth");
exports.authResolvers = {
    Mutation: {
        register: async (_, { input }) => {
            const { email, password, firstName, lastName } = input;
            // Check if user already exists
            const existingUser = await User_1.User.findOne({ email });
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
            // Hash password
            const hashedPassword = await (0, auth_1.hashPassword)(password);
            // Create user
            const user = new User_1.User({
                email,
                password: hashedPassword,
                firstName,
                lastName
            });
            await user.save();
            // Generate token
            const token = (0, auth_1.generateToken)({ id: user._id.toString(), email: user.email });
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
        login: async (_, { input }) => {
            const { email, password } = input;
            // Find user
            const user = await User_1.User.findOne({ email });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            // Check password
            const isValidPassword = await (0, auth_1.comparePassword)(password, user.password);
            if (!isValidPassword) {
                throw new Error('Invalid email or password');
            }
            // Generate token
            const token = (0, auth_1.generateToken)({ id: user._id.toString(), email: user.email });
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
        me: async (_, __, context) => {
            if (!context.user) {
                return null;
            }
            const user = await User_1.User.findById(context.user.id);
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
        profile: async (parent) => {
            const profile = await Profile_1.Profile.findOne({ userId: parent.id });
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
//# sourceMappingURL=auth.js.map