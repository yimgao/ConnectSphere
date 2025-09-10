import mongoose from 'mongoose';
export declare enum StudyStyle {
    VISUAL = "visual",
    AUDITORY = "auditory",
    KINESTHETIC = "kinesthetic",
    READING_WRITING = "reading_writing"
}
export declare enum AvailabilityDay {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THURSDAY = "thursday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}
export interface ITimeSlot {
    start: string;
    end: string;
}
export interface IAvailability {
    day: AvailabilityDay;
    timeSlots: ITimeSlot[];
}
export interface IProfile {
    _id: string;
    userId: mongoose.Types.ObjectId;
    bio?: string;
    courses: string[];
    major?: string;
    year?: number;
    studyStyle: StudyStyle[];
    availability: IAvailability[];
    location?: string;
    preferences: {
        groupSize: number;
        studyEnvironment: string[];
        subjectsOfInterest: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Profile: mongoose.Model<IProfile, {}, {}, {}, mongoose.Document<unknown, {}, IProfile, {}, {}> & IProfile & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Profile.d.ts.map