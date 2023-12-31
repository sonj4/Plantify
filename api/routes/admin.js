import express from 'express';
import verifyToken from '../middleware/verifyToken.js';
import verifyAdmin from '../middleware/verifyAdmin.js';
import { 
  getIdentificationRequests, 
  identifyPlant, 
  getUsers, 
  updateUser, 
  deleteUser,
  createUser
} from '../controllers/AdminController.js';

import { getPlants, newPlant, updatePlant, deletePlant, identifyPlantAdmin } from "../controllers/PlantController.js";

const router = express.Router();

router.get('/unidentified', verifyToken, verifyAdmin, getIdentificationRequests);
router.put('/identify/:requestId', verifyToken, verifyAdmin, identifyPlant);
router.get('/users', verifyToken, verifyAdmin, getUsers);
router.post('/users', verifyToken, verifyAdmin, createUser);
router.put('/users/:userId', verifyToken, verifyAdmin, updateUser);
router.delete('/users/:userId', verifyToken, verifyAdmin, deleteUser);
router.get('/plants', verifyToken, verifyAdmin, getPlants);
router.post('/plants', verifyToken, verifyAdmin, newPlant);
router.put('/identify/plants/:plantId', verifyToken, verifyAdmin, identifyPlantAdmin);
router.put('/plants/:plantId', verifyToken, verifyAdmin, updatePlant);
router.delete('/plants/:plantId', verifyToken, verifyAdmin, deletePlant);

export default router;
