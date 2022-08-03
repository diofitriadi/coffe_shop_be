const Products = require('../model/products')

module.exports = {
    getProducts: async (req, res)=> {
        try {
            const results = await Products.add(req, res)
            return res.status(200).send(results)
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}