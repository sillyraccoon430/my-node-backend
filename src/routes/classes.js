const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

// Gjithë përdoruesit e loguar mund të shikojnë klasat
router.get('/', authMiddleware, classController.getAllClasses);
router.get('/:id', authMiddleware, classController.getClassById);

// Vetëm rolet 'admin' dhe 'manager' mund të krijojnë, përditësojnë dhe fshijnë klasa
router.post('/', authMiddleware, roleMiddleware(['admin', 'manager']), classController.createClass);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), classController.updateClass);
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'manager']), classController.deleteClass);

module.exports = router;
