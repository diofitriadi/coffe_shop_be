const Product = require('../model/product')

module.exports = {
    getProduct: async (req, res)=> {
        try {
            const results = await Product.get(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    getProductById: async (req, res)=> {
        try {
            const results = await Product.getById(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    addProduct: async (req, res)=> {
        console.log(req.file, "xixixi")
        try {
            const reqModifer = {
                ...req,
                body: { ...req.body, product_image: req.file.filename }
            }
            const results = await Product.add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateProduct: async (req, res) => {
        try {
            let reqModifier = {
                ...req,
            }
            if(req.file) { 
                reqModifier = {
                    ...req,
                    body: { ...req.body, product_image: req.file.filename },
                }
            }
            const results = await Product.update(reqModifier, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    deleteProduct: async(req, res)=> {
        try {
            const results = await Product.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}