import mongoose from 'mongoose';
export declare enum GroupStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    ARCHIVED = "archived"
}
export interface IGroup {
    _id: string;
    name: string;
    description?: string;
    course: string;
    createdBy: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    maxMembers: number;
    status: GroupStatus;
    tags: string[];
    meetingSchedule?: {
        frequency: string;
        day?: string;
        time?: string;
        location?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const Group: mongoose.Model<IGroup, {}, {}, {}, mongoose.Document<unknown, {}, IGroup, {}, {}> & IGroup & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Group.d.ts.map