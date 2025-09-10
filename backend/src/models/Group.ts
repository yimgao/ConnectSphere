import mongoose from 'mongoose';

export enum GroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
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
    frequency: string; // 'weekly', 'bi-weekly', 'monthly'
    day?: string;
    time?: string;
    location?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const groupSchema = new mongoose.Schema<IGroup>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  course: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  maxMembers: {
    type: Number,
    min: 2,
    max: 20,
    default: 6
  },
  status: {
    type: String,
    enum: Object.values(GroupStatus),
    default: GroupStatus.ACTIVE
  },
  tags: [{
    type: String,
    trim: true
  }],
  meetingSchedule: {
    frequency: {
      type: String,
      enum: ['weekly', 'bi-weekly', 'monthly']
    },
    day: String,
    time: String,
    location: String
  }
}, {
  timestamps: true
});

export const Group = mongoose.model<IGroup>('Group', groupSchema);