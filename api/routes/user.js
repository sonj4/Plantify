import express from "express";
import { getPlant, getPlants, updatePlant, newPlant, deletePlant } from "../controllers/UserController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get('/plants/:plantId', verifyToken, getPlant);
router.get("/plants", verifyToken, getPlants);
router.post('/plants', verifyToken, newPlant);
router.put('/plants/:plantId', verifyToken, updatePlant);
router.delete('/plants/:plantId', verifyToken, deletePlant);

export default router;