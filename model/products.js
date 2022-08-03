const db = require('../helper/db_connection')

module.exports = {
  add: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products`, (err, result) => {
        if (err) {
          reject({
            success: false, message: err.sqlMessage, data: {
              errCode: err.code, errNo: err.errno
            }
          })
        }
        resolve({
          status: 200,
          message: 'Success',
          data: result
        })
      })
    })
  }
}