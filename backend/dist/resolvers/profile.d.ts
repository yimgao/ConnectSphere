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
export declare const profileResolvers: {
    Mutation: {
        createProfile: (_: any, { input }: {
            input: ProfileInput;
        }, context: Context) => Promise<{
            id: string;
            userId: string;
            bio: string | undefined;
            courses: string[];
            major: string | undefined;
            year: number | undefined;
            studyStyle: import("../models/Profile").StudyStyle[];
            availability: import("../models/Profile").IAvailability[];
            location: string | undefined;
            preferences: {
                groupSize: number;
                studyEnvironment: string[];
                subjectsOfInterest: string[];
            };
        }>;
        updateProfile: (_: any, { input }: {
            input: ProfileInput;
        }, context: Context) => Promise<{
            id: string;
            userId: string;
            bio: string | undefined;
            courses: string[];
            major: string | undefined;
            year: number | undefined;
            studyStyle: import("../models/Profile").StudyStyle[];
            availability: import("../models/Profile").IAvailability[];
            location: string | undefined;
            preferences: {
                groupSize: number;
                studyEnvironment: string[];
                subjectsOfInterest: string[];
            };
        }>;
    };
};
//# sourceMappingURL=profile.d.ts.map