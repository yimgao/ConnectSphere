import mongoose from 'mongoose';
export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=User.d.ts.map