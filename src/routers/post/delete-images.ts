import  { Router,  Request,  Response, NextFunction } from 'express' 
import post from '../../models/post'   


const router  =  Router ()   

router.post('/post:id/delete/images',async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;  
    const { imagesIds } = req.body;   

    const Post  = await post.findOneAndUpdate({ _id: id }, 
        {$pull: { images:{_id: {$in: imagesIds } } }}, {new: true})  

        res.status(200).send(post); 

})  

export { router as deleteImagesRouter }