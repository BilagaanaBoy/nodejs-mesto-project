import { Router } from 'express';
import userController from '../controllers/users';


// prettier-ignore
const {
  getUsers,
  getUser,
  getMe,
  updateProfile,
  updateAvatar,
} = userController;

const router = Router();

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', getUser);
router.patch('/me', updateProfile);
router.patch('/me/avatar', updateAvatar);

export default router;
