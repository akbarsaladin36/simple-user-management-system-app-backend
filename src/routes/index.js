const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/auth/auth_routes')
const usersRoutes = require('../modules/users/users_routes')
const attendancesRoutes = require('../modules/attendances/attendances_routes')

Route.use('/auth', authRoutes)
Route.use('/users', usersRoutes)
Route.use('/attendances', attendancesRoutes)

module.exports = Route
