import * as categoryService from "./category_service.js";

export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategoryServices(
      req.body.name,
    );
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategoriesServices();
    res.json(categories);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryService.updateCategoryServices(id, name);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategoryServices(id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
