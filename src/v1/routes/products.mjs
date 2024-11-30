import express from 'express'
import ProductController from '../controllers/product.mjs'

const router = express.Router()

router.get('/', ProductController.getAllProducts)
router.get('/register/:id?', ProductController.registerForm)
router.get('/:id', ProductController.getProductById)
router.post('/register/:id?', ProductController.registerProduct)
router.delete('/', ProductController.deleteProduct)

export default router
