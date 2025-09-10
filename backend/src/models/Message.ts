import mongoose from 'mongoose';

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  FILE = 'file',
  SYSTEM = 'system'
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

const messageSchema = new mongoose.Schema<IMessage>({
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: Object.values(MessageType),
    default: MessageType.TEXT
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  attachments: [{
    type: String
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: {
    type: Date
  },
  replyTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  reactions: [{
    emoji: {
      type: String,
      required: true
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }]
}, {
  timestamps: true
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);