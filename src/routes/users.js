const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const usersController = require('../controllers/usersController');

router.use(authenticateToken);

router.get('/', authorizeRoles('admin'), usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', authorizeRoles('admin'), usersController.deleteUser);

module.exports = router;
