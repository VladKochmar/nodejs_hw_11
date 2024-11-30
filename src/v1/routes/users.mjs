import { Router } from 'express'
import UserController from '../controllers/user.mjs'
import UserValidator from '../../../validators/user.mjs'

import { checkSchema } from 'express-validator'

const router = Router()

router.get('/', UserController.usersList)

router.get('/register/:id?', UserController.registerForm)

router.get('/:id', UserController.getUserById)

router.post('/register/:id?', checkSchema(UserValidator.userSchema), UserController.registerUser)

router.delete('/', UserController.deleteUser)

export default router
