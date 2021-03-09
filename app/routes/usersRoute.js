const express = require('express')
const usersController = require('../controllers/usersController')

const router = express.Router();

router.get('/users/getall', usersController.getAllUsers);
router.post('/auth/signup', usersController.createUser);
router.post('/auth/signin', usersController.siginUser);
router.delete('/users/delete', usersController.deleteUser);

module.exports = router;
