const db = require('../helper/db_connection')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports = {
    login: (req, res)=> {
        const {email, password} = req.body
        return new Promise((resolve, reject)=> {
            db.query(`SELECT id, password FROM users WHERE email='${email.toLowerCase()}'`
            ,(err, results)=> {
                if(err) {reject({message: 'Email atau Password salah'}) //bcrypt nya error
                } else {
                    bcrypt.compare(password, results[0].password, function(errHash, succHash) {                  
                        if(errHash) {reject({message: 'Ada Masalah Saat Login, Silahkan Coba Lagi'})}
                        if(succHash) {
                            const token = jwt.sign({ user_id: results[0].id }, process.env.JWT_SECRET_KEY, {
                                expiresIn: '1day'
                            })
                            resolve({
                                message: 'login success',
                                status: 200,
                                user_id: results[0].id,
                                token
                                })
                        } else {reject({message: 'Email atau Password salah'})}    
                    })
                }
            })
        })
    },
    register: (req, res)=> {
        const {email, password, phone_number} = req.body
        return new Promise((resolve, reject) => {
            if(req.body.role) {resolve({message:"you are not permitted" })}
            bcrypt.hash(password, 10, function(err, hashedPassword) {
                if(err) {reject({message: 'ada error'})
                } else {
                    db.query(`INSERT INTO users(email, password, phone_number) VALUES('${email}', '${hashedPassword}', '${phone_number}')`,(err, results)=> {
                        if(err) {reject({message: err.code})}
                        resolve({
                            message: 'register success',
                            status: 200,
                            data: results
                        })
                    })
                }
            })
        })
    }
}