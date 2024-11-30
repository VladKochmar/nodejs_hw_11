import User from '../models/user/User.mjs'
import UsersDBService from '../models/user/UsersDBService.mjs'
import TypesDBService from '../models/type/TypesDBService.mjs'
import { prepareToken } from '../../../utils/jwtHelper.mjs'

class AuthController {
  static async signup(req, res) {
    try {
      const typeId = await TypesDBService.findOne({ title: 'guest' }, { _id: 1 })
      console.log('typeId', typeId)

      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        type: typeId,
      })
      user.setPassword(req.body.password)
      const populatedUser = await user.populate('type')
      const savedUser = await user.save()
      const token = prepareToken(
        {
          id: savedUser._id,
          username: savedUser.username,
          type: populatedUser.type.title,
        },
        req.headers
      )
      res.status(201).json({
        result: 'Signed up successfully',
        token,
      })
    } catch (err) {
      console.log(err)

      res.status(500).json({ error: 'Signup error' })
    }
  }

  static async login(req, res) {
    if (!req.body.email) {
      return res.status(401).json({ error: 'Email is required' })
    }
    if (!req.body.password) {
      return res.status(401).json({ error: 'Password is required' })
    }

    try {
      const user = await UsersDBService.findOne({
        email: req.body.email,
      })

      if (!user) return res.status(401).json({ error: 'User not found' })

      if (!user.validPassword(req.body.password)) return res.status(401).json({ error: 'Login error' })

      const currentType = await TypesDBService.getById(user.type)
      const userType = currentType.title

      const token = prepareToken({ id: user._id, username: user.username, type: userType }, req.headers)

      res.json({
        result: 'Authorized',
        token,
      })
    } catch (err) {
      console.log(err)

      res.status(401).json({ error: 'Log in error' })
    }
  }
}

export default AuthController
