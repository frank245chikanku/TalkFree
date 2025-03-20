"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var commentSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
    },
    content: {
        type: String,
        required: true
    }
});
commentSchema.statics.build = function (createCommentDto) { return new Comment(createCommentDto); };
var Comment = mongoose_1.default.model('Comment', commentSchema);
exports.default = Comment;
