import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import { 
  getNotifications, 
  createNotification, 
  updateNotification, 
  deleteNotification
} from '../controllers/NotificationController.js';

const router = express.Router();

router.get('/', verifyToken, getNotifications);
router.post('/', verifyToken, createNotification);
router.put('/:notificationId', verifyToken, updateNotification);
router.delete('/:notificationId', verifyToken, deleteNotification);

export default router;
