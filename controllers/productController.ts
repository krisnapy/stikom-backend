import { Product } from '../models'

const ProductController = () => {
  const getProducts = async (_req: any, res: any) => {
    try {
      const products = await Product.findAll()

      res.status(200).json(products)
    } catch (error: any) {
      res.status(500).json(error)
    }
  }

  const createProduct = async (req: any, res: any) => {
    const {
      product: { name, price, quantity, user, category },
    } = req.body

    try {
      await Product.create({
        name: name,
        price: price,
        quantity: quantity,
        user_id: user,
        category_id: category
      })

      res.status(200).json({ message: 'Add product success' })
    } catch (error: any) {
      res.status(500).json(error)
    }
  }

  const updateProduct = async (req: any, res: any) => {
    const {
      category: { name, display_name, status },
    } = req.body

    try {
      const productId = req.body.id

      const product = await Product.findOne({
        where: { id: productId },
      })

      if (!product) return res.status(500).json({ message: 'Product not found' })

      product.set({
        name: name,
        display_name: display_name,
        status: status,
      })

      product.save()

      res.status(200).json({ message: 'Update product success' })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  return { getProducts, createProduct, updateProduct }
}

export default ProductController
