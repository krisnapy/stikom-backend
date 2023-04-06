import express from 'express'
import CategoryController from '../controllers/categoryController'

const router = express.Router()
const { createCategory, getCategories } = CategoryController()

router.get('/product-category', getCategories)
router.post('/product-category', createCategory)

module.exports = router