const express = require('express');
const router = express.Router();
const controller = require('../controllers/users')

router.get('/', controller.AllUsers)
router.get('/:id', controller.Oneuser)
router.post('/', controller.InsertUser)
router.delete('/:id', controller.deleteUser)
router.put('/:id', controller.UpdateUser)
router.post('/admin', controller.validationUser)

module.exports = router;