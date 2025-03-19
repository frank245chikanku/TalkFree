import mongoose from "mongoose";
import { authenticationService } from "../../common /src";

const userSchema = new mongoose.Schema({
    email: {
        type: String,  
        required: true 
    },
    password: {
        type: String,  
        required: true
    },

    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "post"
        }
    ]
})

userSchema.pre('save', async function(done) {
    if(this.isModified('password') || this.isNew) {
  const hashedPwd = authenticationService.pwdToHash(this.get('password')); 

    }  

   done()     
})


export const User = mongoose.model('User', userSchema); 