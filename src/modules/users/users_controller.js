const bcrypt = require('bcrypt')
const helper = require('../../helpers/helper')
const usersModel = require('./users_model')

module.exports = {
    allUsers: async (req, res) => {
        try {
            const result = await usersModel.getAllUsersData()
            if(result.length > 0) {
                return helper.response(res, 200, 'All of users data is successfully appeared!', result)
            } else {
                return helper.response(res, 400, 'All of users data is empty. Please create a new users')
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneUser: async (req, res) => {
        try {
            const { id } = req.params
            const result = await usersModel.getOneUsersData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `the data of user id ${id} is successfully appeared!`, result)
            } else {
                return helper.response(res, 400, `the data of user id ${id} is not found! Please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createUser: async (req, res) => {
        try {
            const { userEmail, userPassword, userFirstName, userLastName, userAddress, userPhoneNumber } = req.body
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(userPassword, salt)
            const setData = {
                user_email: userEmail,
                user_password: encryptPassword,
                user_first_name: userFirstName,
                user_last_name: userLastName,
                user_address: userAddress,
                user_phone_number: userPhoneNumber,
                user_status: 'staff',
                user_verify: 'Y'
            }
            const result = await usersModel.createNewData(setData)
            delete result.user_password
            return helper.response(res, 200, 'A new user is successfully created!', result)
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const { userFirstName, userLastName, userAddress, userPhoneNumber } = req.body
            const result = await usersModel.getOneUsersData(id)
            if(result.length > 0) {
                const setData = {
                    user_first_name: userFirstName,
                    user_last_name: userLastName,
                    user_address: userAddress,
                    user_phone_number: userPhoneNumber,
                    user_updated_at: new Date(Date.now())
                }
                const newResult = await usersModel.updateOneUserData(setData, id)
                return helper.response(res, 200, `the user id ${id} data is successfully updated!`, newResult)
            } else {
                return helper.response(res, 400, `the user id ${id} data is not found! Please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateUserPassword: async (req, res) => {
        try {
            const { id } = req.params
            const { userPassword } = req.body
            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(userPassword, salt)
            const result = await usersModel.getOneUsersData(id)
            if(result.length > 0) {
                const setData = {
                    user_password: encryptPassword,
                    user_updated_at: new Date(Date.now())
                }
                const newResult = await usersModel.updateOneUserData(setData, id)
                return helper.response(res, 200, `the password data for user id ${id} is successfully changed!`, newResult)
            } else {
                return helper.response(res, 400, `the password data for user id ${id} is not changed! Something went wrong and please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await usersModel.getOneUsersData(id)
            if(result.length > 0) {
                const newResult = await usersModel.deleteOneUserData(id)
                return helper.response(res, 200, `the user id ${id} is successfully deleted!`, newResult)
            } else {
                return helper.response(res, 400, `the user id ${id} data is not found! Please try again!`, null)
            }
        } catch (err) {
            console.log(err)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}