import { Router, NextFunction, Request, Response } from "express";  
import post from '../../models/post';  
import  { BadRequestError } from "../../../common /src";
  
const router = Router();   

router.post('/api/post/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;  
    const { content, title } = req.body; 

    if (!id) {
        const error = new BadRequestError('Post ID is required') 
        
    }

    try {
        const updatedPost = await post.findOneAndUpdate(    
            { _id: id }, 
            { $set: { content, title } }, 
            { new: true }
        );

        if (!updatedPost) {
            const error = new BadRequestError('Post not found') 
            
        }

        res.status(200).send(updatedPost);
    } catch (err) {
        const error = new BadRequestError('Post cannot be updated')  
        
    }
});

export { router as updatedPostRouter };
