import CommunityPost from '../models/CommunityPost.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await CommunityPost.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const createPost = async (req, res) => {
    try {
        const newPost = new CommunityPost({
            ...req.body,
            user: req.user.id
        });

        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const updatePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "No post found with this ID" });
        }

        if (String(post.user) !== String(req.user.id)) {
            return res.status(401).json({ message: "You are not authorized to update this post" });
        }

        Object.assign(post, req.body);
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await CommunityPost.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: "No post found with this ID" });
        }

        if (String(post.user) !== String(req.user.id)) {
            return res.status(401).json({ message: "You are not authorized to delete this post" });
        }

        await post.remove();
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error: " + error });
    }
}
