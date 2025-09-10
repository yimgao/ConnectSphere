import mongoose from 'mongoose';

export enum StudyStyle {
  VISUAL = 'visual',
  AUDITORY = 'auditory',
  KINESTHETIC = 'kinesthetic',
  READING_WRITING = 'reading_writing'
}

export enum AvailabilityDay {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export interface ITimeSlot {
  start: string; // "09:00"
  end: string;   // "17:00"
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

const profileSchema = new mongoose.Schema<IProfile>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  courses: [{
    type: String,
    required: true
  }],
  major: {
    type: String
  },
  year: {
    type: Number,
    min: 1,
    max: 8
  },
  studyStyle: [{
    type: String,
    enum: Object.values(StudyStyle),
    required: true
  }],
  availability: [{
    day: {
      type: String,
      enum: Object.values(AvailabilityDay),
      required: true
    },
    timeSlots: [{
      start: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      },
      end: {
        type: String,
        required: true,
        match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
      }
    }]
  }],
  location: {
    type: String
  },
  preferences: {
    groupSize: {
      type: Number,
      min: 2,
      max: 10,
      default: 4
    },
    studyEnvironment: [{
      type: String
    }],
    subjectsOfInterest: [{
      type: String
    }]
  }
}, {
  timestamps: true
});

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);