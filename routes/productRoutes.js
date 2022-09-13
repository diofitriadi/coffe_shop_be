const express = require("express")
const { getProduct, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/productControllers')
const router = express.Router()
const verifyAuth = require("../helper/verifyAuth")
const upload = require('../helper/multer')


router.get('/', getProduct)
router.get('/:id', getProductById)
router.post('/', verifyAuth, upload, addProduct)
router.patch('/:id', verifyAuth, upload, updateProduct)
router.delete('/:id', verifyAuth, deleteProduct)



module.exports = router