import { parseBearer } from '../utils/jwtHelper.mjs'

const auth = app => {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    next()
  })

  app.use((req, res, next) => {
    const openPathes = ['/api/v1/auth/login', '/api/v1/auth/signup', '/api/v1/products']

    // Перевірка, чи шлях потребує авторизації
    if (!openPathes.includes(req.path)) {
      try {
        // Парсинг токена та додавання користувача до запиту
        req.user = parseBearer(req.headers.authorization, req.headers)
      } catch (err) {
        // Якщо авторизація не вдалася, повертається статус 401
        return res.status(401).json({ result: 'Access Denied' })
      }
    } else {
      if (req.headers.authorization) {
        req.user = parseBearer(req.headers.authorization, req.headers)
      }
    }
    next() // Передача обробки наступному middleware
  })
}

export default auth
