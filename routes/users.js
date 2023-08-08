const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);

router.get('/:userId', auth, getUserById);

router.post('/signup', createUser);

router.patch('/me', auth, updateUser);

router.patch('/me/avatar', auth, updateUserAvatar);

router.post('/signin', login);

router.get('/me', auth, getUser);

module.exports = router;
