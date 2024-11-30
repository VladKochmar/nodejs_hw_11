import ProductsDBService from '../models/product/ProductsDBService.mjs'

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const filters = {}

      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key]
      }

      const dataList = await ProductsDBService.getList(filters)

      res.status(200).json({
        products: dataList,
        user: req.user || null,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async getProductById(req, res) {
    try {
      if (!req.user) return res.status(403).json({ error: 'Access denied' })

      const id = req.params.id
      const product = await ProductsDBService.getById(id)

      res.status(200).json({ product, user: req.user || null })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerForm(req, res) {
    try {
      if (!req.user) return res.status(403).json({ error: 'Access denied' })

      const id = req.params.id
      let product = null

      if (id) product = await ProductsDBService.getById(id)

      res.status(200).json({
        product,
        user: req.user,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

  static async registerProduct(req, res) {
    if (!req.user) return res.status(403).json({ error: 'Access denied' })

    const data = req.body

    try {
      const productData = {
        ...req.body,
      }

      if (req.params.id) {
        await ProductsDBService.update(req.params.id, productData)
      } else {
        await ProductsDBService.create(productData)
      }

      res.status(200).json({ message: 'Product registered successfully' })
    } catch (err) {
      res.status(500).json({ errors: [{ msg: err.message }], product: data, user: req.user })
    }
  }

  static async deleteProduct(req, res) {
    try {
      await ProductsDBService.deleteById(req.body.id)
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default ProductController
