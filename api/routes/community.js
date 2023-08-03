import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { 
  getPosts, 
  createPost, 
  updatePost, 
  deletePost
} from '../controllers/CommunityController.js';

const router = express.Router();

router.get('/community', verifyToken, getPosts);
router.post('/community', verifyToken, createPost);
router.put('/community/:postId', verifyToken, updatePost);
router.delete('/community/:postId', verifyToken, deletePost);

export default router;
