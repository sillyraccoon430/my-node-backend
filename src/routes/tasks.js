const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Gjithë përdoruesit e loguar mund të shikojnë detyrat
router.get('/', authMiddleware, taskController.getAllTasks);
router.get('/:id', authMiddleware, taskController.getTaskById);

// Vetëm rolet 'admin' dhe 'manager' mund të krijojnë, përditësojnë dhe fshijnë detyra
router.post('/', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.createTask);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.updateTask);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), taskController.deleteTask);

module.exports = router;
