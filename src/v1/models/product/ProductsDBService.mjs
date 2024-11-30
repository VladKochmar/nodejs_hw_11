import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import Product from './Product.mjs'

class ProductsDBService extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const res = await Product.find(filters)
      return res
    } catch (err) {
      return []
    }
  }
}

export default new ProductsDBService(Product)
