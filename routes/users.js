const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/signup', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateUserAvatar);

router.post('/signin', login);

router.get('/me', getUser);

module.exports = router;
