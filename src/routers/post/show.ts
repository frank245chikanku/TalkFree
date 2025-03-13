import express from 'express';
import Post from '../../models/post';

const router = express.Router();  

router.get('/api/post/show/:id?', (req, res, next) => {
    (async () => { 
        try {
            const { id } = req.params;

            if (!id) {
                const allPosts = await Post.find();
                return res.status(200).json({ posts: allPosts });
            }

            const post = await Post.findById(id).populate ('comments')

            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            return res.status(200).json({ post });

        } catch (error) {
            next(error);
        }
    })();
});

export { router as showpostRouter };