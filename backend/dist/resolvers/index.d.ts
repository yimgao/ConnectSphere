export declare const resolvers: {
    Query: {
        me: (_: any, __: any, context: import("../types").Context) => Promise<{
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            avatar: string | undefined;
            isVerified: boolean;
            createdAt: string;
        } | null>;
    };
    Mutation: {
        createProfile: (_: any, { input }: {
            input: import("./profile").ProfileInput;
        }, context: import("../types").Context) => Promise<{
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
            input: import("./profile").ProfileInput;
        }, context: import("../types").Context) => Promise<{
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
        register: (_: any, { input }: {
            input: import("./auth").RegisterInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                avatar: string | undefined;
                isVerified: boolean;
                createdAt: string;
            };
        }>;
        login: (_: any, { input }: {
            input: import("./auth").LoginInput;
        }) => Promise<{
            token: string;
            user: {
                id: string;
                email: string;
                firstName: string;
                lastName: string;
                avatar: string | undefined;
                isVerified: boolean;
                createdAt: string;
            };
        }>;
    };
    User: {
        profile: (parent: any) => Promise<{
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
        } | null>;
    };
};
//# sourceMappingURL=index.d.ts.map