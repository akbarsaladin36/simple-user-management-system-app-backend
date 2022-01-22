const e = require('express')
const helper = require('../../helpers/helper')
const attendancesModel = require('./attendances_model')

module.exports = {
    allAttendances: async (req, res) => {
        try {
            const result = await attendancesModel.getAllAttendancesData()
            if(result.length > 0) {
                return helper.response(res, 200, 'All of attendances data is successfully appeared!', result)
            } else {
                return helper.response(res, 400, 'All of attendances data is empty. Please create a first attendances data now!', null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allAttendancesByUserId: async (req, res) => {
        try {
            const { id } = req.params
            const result = await attendancesModel.getAllAttendancesByUserIdData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `All of All of attendances data from user id ${id} is successfully appeared!`, result)
            } else {
                return helper.response(res, 400, `All of attendances data from user id ${id} is empty. Please create a first attendances data now!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        } 
    },
    attendancesDetail: async (req, res) => {
        try {
            const { id } = req.params
            const result = await attendancesModel.getOneAttendancesData(id)
            if(result.length > 0) {
                return helper.response(res, 200, 'A detail of attendances data is successfully appeared!', result)
            } else {
                return helper.response(res, 400, 'A detail of attendances data is not found! Please try again!', null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createNewAttendances: async (req, res) => {
        try {
            const { attendancesNotes, attendancesStatus, attendancesStartTime } = req.body
            const setData = {
                user_id: req.decodeToken.user_id,
                attendances_notes: attendancesNotes,
                attendances_status: attendancesStatus,
                attendances_start_dttm: new Date(Date.now())
            }
            const result = await attendancesModel.createAttendancesData(setData)
            return helper.response(res, 200, 'A new attendances data is successfully created!', result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateAttendances: async (req, res) => {
        try {
            const { id } = req.params
            const { attendancesNotes } = req.body
            const result = await attendancesModel.getOneAttendancesData(id)
            if(result.length > 0) {
                const setData = {
                    attendances_notes: attendancesNotes,
                    attendances_stop_dttm: new Date(Date.now())
                }
                const newResult = await attendancesModel.updateOneAttendancesData(setData, id)
                return helper.response(res, 200, 'An attendances data is successfully updated!', newResult)
            } else {
                return helper.response(res, 400, 'An attendances data is not updated because the detail is not found!', null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteAttendances: async (req, res) => {
        try {
            const { id } = req.params
            const result = await attendancesModel.getOneAttendancesData(id)
            if(result.length > 0) {
                const newResult = await attendancesModel.deleteOneAttendancesData(id)
                return helper.response(res, 200, `An attendances data for id ${id} is successfully deleted!`, newResult)
            } else {
                return helper.response(res, 400, `An attendances data for id ${id} is not found! Please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}