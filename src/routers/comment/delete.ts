import {Router, Response, Request, NextFunction } from 'express'   
import post from '../../models/post' 
import Comment from '../../models/comment'  

const router = Router ()  

router.delete('/api/comment/:commentId/delete/:postId', async (req: Request, res: Response, next: NextFunction) => {
    const { postId, commentId } = req.params; 

    if(!commentId || !postId) {
        const error = new Error('post id and comment id are required!') as CustomError;
        error.status = 400;    
        next(error)
    } 
    try {
        await Comment.findByIdAndDelete({_id: commentId })
    } catch(err) {
        next(new Error ('comment cannot be updated'))
    }

    await post.findByIdAndUpdate({_id: postId }, {$pull: {comments: commentId }}) 

    res.status(200).json({ success: true })  
})   

export { router as deleteCommentRouter}
