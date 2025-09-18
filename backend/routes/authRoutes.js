// const express = require('express');
// const router = express.Router();
// const { signup, login } = require('../controllers/userController');

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;



const express = require('express');
const router = express.Router();
const {
  signup, login, listUsers, getUserById, updateUser, deleteUser
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);

router.get('/users', listUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
