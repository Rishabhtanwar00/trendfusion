import Category from '../models/Category.model.js';
import SubCategory from '../models/SubCategory.model.js';

//add new category
//method: POST
//end point : api/category/add
export const addCategory = async (req, res) => {
	try {
		const { name } = req.body;

		const existingCategory = await Category.findOne({ name });

		if (existingCategory) {
			return res.status(200).json({ mssg: 'Category already added.' });
		}

		const newCategory = new Category({
			name,
		});

		await newCategory.save();

		return res.status(200).json({ mssg: 'New category added successfully' });
	} catch (err) {
		console.log('error in addCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//update exiting category
//method: POST
//end point : api/category/update
export const updateCategory = async (req, res) => {
	try {
		const { categoryId, name } = req.body;

		if (!name || name === '') {
			return res.status(200).json({ mssg: 'Name can not be blank' });
		}

		const existingCategory = await Category.findById(categoryId);

		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Category not found' });
		}
		console.log(existingCategory.name);
		console.log(name);
		if (existingCategory.name === name) {
			return res
				.status(200)
				.json({ error: 'Category name is same as earlier' });
		}
		console.log('object');

		await Category.findByIdAndUpdate(categoryId, { name });

		return res.status(200).json({ mssg: 'Category updated successfully' });
	} catch (err) {
		console.log('error in updateCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//delete category
//method: POST
//end point : api/category/remove
export const removeCategory = async (req, res) => {
	try {
		const { categoryId } = req.body;

		const existingCategory = await Category.findById(categoryId);

		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Category not found' });
		}

		//remove refrence of this catgory from all subcategory
		await SubCategory.updateMany(
			{
				Category: categoryId, //Find all subcategories where the Category array contains categoryId.
			},
			{ $pull: { Category: categoryId } } //$pull is a MongoDB operator that removes specific values from an array.
		);

		//Delete subcategories that don't have any category reference
		await SubCategory.deleteMany({ Category: { $size: 0 } });

		await Category.findByIdAndDelete(categoryId);

		return res.status(200).json({ mssg: 'Category deleted successfully.' });
	} catch (err) {
		console.log('error in deleteCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//get all category
//method: POST
//end point : api/category/all
export const getAllCategory = async (req, res) => {
	try {
		const categorylist = await Category.find().populate({
			path: 'subCategory', // Refers to the field in Category schema
			model: 'SubCategory', // Model name for SubCategory
		});
		return res.status(200).json({ categories: categorylist });
	} catch (err) {
		console.log('error in getAllCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};
