"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = exports.AvailabilityDay = exports.StudyStyle = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var StudyStyle;
(function (StudyStyle) {
    StudyStyle["VISUAL"] = "visual";
    StudyStyle["AUDITORY"] = "auditory";
    StudyStyle["KINESTHETIC"] = "kinesthetic";
    StudyStyle["READING_WRITING"] = "reading_writing";
})(StudyStyle || (exports.StudyStyle = StudyStyle = {}));
var AvailabilityDay;
(function (AvailabilityDay) {
    AvailabilityDay["MONDAY"] = "monday";
    AvailabilityDay["TUESDAY"] = "tuesday";
    AvailabilityDay["WEDNESDAY"] = "wednesday";
    AvailabilityDay["THURSDAY"] = "thursday";
    AvailabilityDay["FRIDAY"] = "friday";
    AvailabilityDay["SATURDAY"] = "saturday";
    AvailabilityDay["SUNDAY"] = "sunday";
})(AvailabilityDay || (exports.AvailabilityDay = AvailabilityDay = {}));
const profileSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Profile = mongoose_1.default.model('Profile', profileSchema);
//# sourceMappingURL=Profile.js.map