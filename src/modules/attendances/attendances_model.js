const connection = require('../../config/mysql')

module.exports = {
    getAllAttendancesData: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM attendances', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getAllAttendancesByUserIdData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM attendances WHERE user_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    getOneAttendancesData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM attendances WHERE attendances_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    createAttendancesData: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO attendances SET ?', setData, (error, result) => {
                if(!error) {
                    const newResult = {
                        ...setData,
                        id: result.insertId
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    updateOneAttendancesData: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE attendances SET ? WHERE attendances_id = ?', [setData, id], (error, result) => {
                if(!error) {
                    const newResult = {
                        ...setData,
                        id: id
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    deleteOneAttendancesData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM attendances WHERE attendances_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}