import { ProductCategory } from '../models'

const CategoryController = () => {
  const getCategories = async (_req: any, res: any) => {
    try {
      const categories = await ProductCategory.findAll()

      res.status(200).json(categories)
    } catch (error: any) {
      res.status(500).json(error)
    }
  }

  const createCategory = async (req: any, res: any) => {
    const {
      category: { name, display_name, status },
    } = req.body

    try {
      await ProductCategory.create({
        name: name,
        display_name: display_name,
        status: status,
      })

      res.status(200).json({ message: 'Add category success' })
    } catch (error: any) {
      res.status(500).json(error)
    }
  }

  return { getCategories, createCategory }
}

export default CategoryController
