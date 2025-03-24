"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [
        { src: { type: String, required: true } }
    ],
    comments: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});
postSchema.statics.build = function (createpostDto) { return new post(createpostDto); };
var post = mongoose_1.default.model('post', postSchema);
exports.default = post;
