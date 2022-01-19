const express = require('express')
const router = express.Router()
const attendancesController = require('./attendances_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, attendancesController.allAttendances)
router.get('/users/:id', authMiddleware.userAuthentication, attendancesController.allAttendancesByUserId)
router.get('/:id', authMiddleware.userAuthentication, attendancesController.attendancesDetail)
router.post('/', authMiddleware.userAuthentication, attendancesController.createNewAttendances)
router.patch('/:id', authMiddleware.userAuthentication, attendancesController.updateAttendances)
router.delete('/:id', authMiddleware.userAuthentication, attendancesController.deleteAttendances)

module.exports = router;