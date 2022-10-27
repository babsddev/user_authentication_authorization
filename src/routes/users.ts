import { Router } from 'express';
import {
  createUser,
  loginUser,
  updateUserRecord,
  verifyUser,
  forgotPassword,
  changePassword,
} from '../controllers/userController';
import { auth } from '../middleware/auth';
const router = Router();

router.post('/register', createUser);
router.post('/login', loginUser);
router.patch('/update/:id', auth, updateUserRecord);
router.get('/verify/:token', verifyUser);
router.post('/forgotpassword', forgotPassword);
router.patch('/change-password/:id', changePassword);

export default router;
