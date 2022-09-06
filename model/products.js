const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  get: () => {
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
  },
  getById: () => {
    const {products_id} = req.params
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM products WHERE products_id=${products_id}`, (err, result) => {
        if (err) {
          console.log(err)
          reject({
            success: false,
            status: 500,
            message: `Error!, ${err.code}`,
          })
        }
        resolve({
          status: 200,
          message: 'Get By Id Success',
          data: result
        })
      })
    })
  }
  ,
  add: (req, res)=> {
    return new Promise((resolve, reject)=> {
      const { products_name, products_image, products_price, products_desc } = req.body
      db.query(`INSERT INTO products(products_name, products_image, products_price, products_desc) VALUES('${products_name}', '${products_image}','${products_price}','${products_desc}')`, 
      (err, results)=> {
        if(err) {
          console.log(err)
          reject({message: "ada error"})
        }
        resolve({
          message: "add new products success",
          status: 200,
          data: {
            id: results.insertId,
            ...req.body,
          }
        })
      })
    })
  },
  update: (req, res) => {
    return new Promise((resolve, reject)=> {
      const {products_id} = req.params
      db.query(`SELECT * FROM products where products_id='${products_id}'`,(err, results)=> {
        if(err) {
          reject({
            success: false,
            message: `error: ${err.sqlMessage}`,
          })
        } else if(results.length === 0) {
          reject({
            success: false,
            message: `products with id ${products_id} not found`,
            data: []
          })
        }
          let prevData = {
          ...results[0],
          ...req.body,
          products_image: results[0].products_image
        }
        if (req.body.products_image) {
          if (results[0].products_image !== req.body.products_image) {
            fs.unlink(`uploads/${results[0].products_image}`, (err) => {
              if (err) {
                prevData = {
                          ...prevData,
                          products_image: req.file.filename
                        }
              }
                    })
                    prevData = {
                      ...prevData,
                      products_image: req.file.filename
                    }
          }
        }
        
        const { products_name, products_image, products_price, products_desc } = prevData
        

        db.query(`UPDATE products SET products_name='${products_name}', products_image='${products_image}', products_price='${products_price}', products_desc='${products_desc}' WHERE products_id='${products_id}'`,(err, results)=> {
          if(err) {
            console.log(err)
            reject({message: "ada error"})
          }
          resolve({
            message: "update products success",
            status: 200,
            data: results
          })
        })
      })
    })
  },
  remove:(req, res)=> {
    return new Promise((resolve, reject)=> {
      const {products_id} = req.params
      db.query(`DELETE FROM products where products_id='${products_id}'`,(err, results)=> {
        if(err) {reject({message: "ada error"})}
        resolve({
          message: "delete products success",
          status: 200,
          data: results
        })
      })
    })
  }
}