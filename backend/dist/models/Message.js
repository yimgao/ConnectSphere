"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.MessageType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["FILE"] = "file";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
const messageSchema = new mongoose_1.default.Schema({
    groupId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    senderId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Message'
    },
    reactions: [{
            emoji: {
                type: String,
                required: true
            },
            users: [{
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: 'User'
                }]
        }]
}, {
    timestamps: true
});
exports.Message = mongoose_1.default.model('Message', messageSchema);
//# sourceMappingURL=Message.js.map