"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = exports.GroupStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var GroupStatus;
(function (GroupStatus) {
    GroupStatus["ACTIVE"] = "active";
    GroupStatus["INACTIVE"] = "inactive";
    GroupStatus["ARCHIVED"] = "archived";
})(GroupStatus || (exports.GroupStatus = GroupStatus = {}));
const groupSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.Group = mongoose_1.default.model('Group', groupSchema);
//# sourceMappingURL=Group.js.map