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
export declare const authResolvers: {
    Mutation: {
        register: (_: any, { input }: {
            input: RegisterInput;
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
            input: LoginInput;
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
    Query: {
        me: (_: any, __: any, context: Context) => Promise<{
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            avatar: string | undefined;
            isVerified: boolean;
            createdAt: string;
        } | null>;
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
//# sourceMappingURL=auth.d.ts.map