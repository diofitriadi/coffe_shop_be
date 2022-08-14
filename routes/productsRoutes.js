const express = require("express")
const { getProducts, addProducts, updateProducts, deleteProducts } = require('../controllers/productsControllers')
const router = express.Router()
const verifyAuth = require("../helper/verifyAuth")
const upload = require('../helper/multer')


router.get('/', getProducts)
router.post('/', verifyAuth, upload, addProducts)
router.patch('/:products_id', verifyAuth, upload, updateProducts)
router.delete('/:products_id', verifyAuth, deleteProducts)



module.exports = router