import express from 'express';

import { getStands, getStandsBySearch, getStandsByCreator, getStand, createStand, updateStand, likeStand, commentStand, deleteStand } from '../controllers/stands.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/creator', getStandsByCreator);
router.get('/search', getStandsBySearch);
router.get('/', getStands);
router.get('/:id', getStand);

router.post('/', auth,  createStand);
router.patch('/:id', auth, updateStand);
router.delete('/:id', auth, deleteStand);
router.patch('/:id/likeStand', auth, likeStand);
router.post('/:id/commentStand', commentStand);

export default router;