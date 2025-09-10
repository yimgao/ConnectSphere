import mongoose from 'mongoose';
export declare enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file",
    SYSTEM = "system"
}
export interface IMessage {
    _id: string;
    groupId: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    type: MessageType;
    content: string;
    attachments?: string[];
    isEdited: boolean;
    editedAt?: Date;
    replyTo?: mongoose.Types.ObjectId;
    reactions: {
        emoji: string;
        users: mongoose.Types.ObjectId[];
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, {}> & IMessage & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Message.d.ts.map