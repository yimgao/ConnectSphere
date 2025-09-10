"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileResolvers = void 0;
const Profile_1 = require("../models/Profile");
const auth_1 = require("../middleware/auth");
exports.profileResolvers = {
    Mutation: {
        createProfile: async (_, { input }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            // Check if profile already exists
            const existingProfile = await Profile_1.Profile.findOne({ userId: user.id });
            if (existingProfile) {
                throw new Error('Profile already exists for this user');
            }
            const profile = new Profile_1.Profile({
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
        updateProfile: async (_, { input }, context) => {
            const user = (0, auth_1.requireAuth)(context);
            const profile = await Profile_1.Profile.findOneAndUpdate({ userId: user.id }, input, { new: true, upsert: true });
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
//# sourceMappingURL=profile.js.map