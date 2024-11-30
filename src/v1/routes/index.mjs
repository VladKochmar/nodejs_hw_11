import express from 'express'
const router = express.Router()

import authRouter from './auth.mjs'
import userRoutes from './users.mjs'
import productRoutes from './products.mjs'

router.use('/auth', authRouter)
router.use('/users', userRoutes)
router.use('/products', productRoutes)

export default router
