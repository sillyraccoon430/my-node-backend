const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/', authenticateToken, authorizeRoles('admin'), userController.getUsers);
router.patch('/:id/role', authenticateToken, authorizeRoles('admin'), userController.updateRole);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
