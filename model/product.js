const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const {product_name ='', categories_name ='', order='product_name'} = req.query
      const {limit, page, sortBy = 'DESC'} = req.query
      const offset = (page-1) * limit
      db.query(`SELECT product.id, categories_name, product_name, product_image, product_price, product_desc FROM product LEFT JOIN categories ON product.categories_id = categories.id WHERE product_name LIKE '%${product_name}%' AND categories_name LIKE '%${categories_name}%' ORDER BY ${order} ${sortBy} ${page && limit ? `LIMIT ${limit} OFFSET ${offset}` : '' }`, (err, result) => {
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
  getById: (req, res) => {
    const {id} = req.params
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM product WHERE id='${id}'`, (err, results) => {
        if (err) {
          reject({
            success: false,
            status: 500,
            message: `Error!, ${err.code}`,
          })
        } else {
          let totalPage = Math.ceil(result.length/limit)
          if(page > totalPage) {
            reject({
              message: "Page not found!",
              status: 404,
              data: []
          })
          }
          resolve({
            message: "Get all from product success",
            status: 200,
            totalRow: results.length,
            totalPage: totalPage,
            data: results
          });
        }
      })
    })
  }
  ,
  add: (req, res)=> {
    return new Promise((resolve, reject)=> {
      const { categories_id ,product_name, product_image, product_price, product_desc } = req.body
      db.query(`INSERT INTO product(categories_id ,product_name, product_image, product_price, product_desc) VALUES('${categories_id}','${product_name}', '${product_image}','${product_price}','${product_desc}')`, 
      (err, results)=> {
        if(err) {
          console.log(err)
          reject({message: "ada error"})
        }
        resolve({
          message: "add new product success",
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
      const {id} = req.params
      db.query(`SELECT * FROM product where id='${id}'`,(err, results)=> {
        if(err) {res.send({message : "there's error"})}

        const previousData = {
          ...results[0],
          ...req.body
        }
        const { categories_id ,product_name, product_image, product_price, product_desc } = previousData
        const tempImg = results[0].product_image
        if (req.file === '') {
          prevData = {
            ...prevData,
            product_image: results[0].product_image
          }
        }
        if (req.file) {
          fs.unlink(`./uploads/${tempImg}`, (err) => {
            console.log(err)
          })
        }
        db.query(`UPDATE product SET categories_id='${categories_id}', product_name='${product_name}', product_image='${product_image}', product_price='${product_price}', product_desc='${product_desc}' WHERE id='${id}'`, (err, results) => {
          if(err) {
            console.log(err)
            reject({message: "there's an error"})
          }
          resolve({
            message: "update product success",
            status: 200,
            data: results
          })
        })
      })
    })
  },
  remove:(req, res)=> {
    return new Promise((resolve, reject)=> {
      const {id} = req.params
      db.query(`SELECT id, product_image FROM product WHERE id='${id}'`,(err, results)=> {
        if(err) {reject({message: "there's error"})
      } else if(results.length === 0) {
        reject({
          success: false,
          status: 400,
          message: "delete error, data not found"
        })
      } else {
        const tempImg = results[0].product_image
        db.query(`DELETE FROM product WHERE id=${id}`, (err, results) => {
          if(err) {
            reject({
              success: false,
              status: 500,
              message: 'error'
            })
          } else {
            fs.unlink(`./uploads/${tempImg}`, (err) => {
              if(err) {
                reject({
                  success: false,
                  status: 500,
                  message: 'error'
                })
              }
            })
            resolve({
              success: true,
              message: "delete product success",
              status: 200,
              data: results
            })
          }
        })
      }
      })
    })
  }
}