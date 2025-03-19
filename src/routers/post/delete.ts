import { Router, Response, Request, NextFunction } from 'express'   
import post from '../../models/post'  
import  { BadRequestError } from '../../../common /src'

const router = Router()  

router.delete('/api/post/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
        const error = new BadRequestError('post id is required!') 
        
    }
    try {
        await post.findOneAndDelete({_id: id })
    } catch(err) {
        next(new Error('post can not be updated!'))
    }
    res.status(200).json({ success: true })
})  

export { router as deletepostRouter }