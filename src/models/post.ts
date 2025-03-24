
import mongoose from "mongoose";       
import { CommentDoc } from "./comment";            

export interface postDoc extends mongoose.Document {
    title: string,  
    content: string,  
    images: Array<{ src: string }>,
    comments?: Array<CommentDoc>
}

export interface CreatepostDto {
    title: string, 
    content: string
    images: Array<{src: string }>, 
}

export interface postModel extends mongoose.Model<postDoc> {
    build(dto:CreatepostDto) : postDoc
}



const postSchema = new mongoose.Schema({
    title: {
        type: String,  
        required: true
    },
    content: {
        type: String,
        required: true
    },

    images: [
        {src: { type: String, required: true } }
    ],


    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

postSchema.statics.build = (createpostDto: CreatepostDto) => new post(createpostDto)

const post = mongoose.model<postDoc, postModel>('post', postSchema); 

export default post;
