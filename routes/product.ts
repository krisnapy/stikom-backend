import express from 'express'
import ProductController from '../controllers/productController'

const router = express.Router()
const { createProduct, getProducts } = ProductController()

router.get('/product', getProducts)
router.post('/product', createProduct)

module.exports = router
