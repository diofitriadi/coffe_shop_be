const Products = require('../model/products')

module.exports = {
    getProducts: async (req, res)=> {
        try {
            const results = await Products.get(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    getProductsById: async (req, res)=> {
        try {
            const results = await Products.getById(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    },
    addProducts: async (req, res)=> {
        try {
            const reqModifer = {
                ...req,
                body: { ...req.body, products_image: req.file.filename }
            }
            const results = await Products.add(reqModifer, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    updateProducts: async (req, res) => {
        try {
            let reqModifier = {
                ...req,
            }
            if(req.file) { 
                if(req.file !== null && req.file !== '') {
                    reqModifier = {
                    ...req,
                    body: { ...req.body, products_image: req.file.filename },
                    }
                }
            }
            const results = await Products.update(reqModifier, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    deleteProducts: async(req, res)=> {
        try {
            const results = await Products.remove(req, res)
            return res.status(201).send(results)
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}