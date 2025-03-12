import Category from '../models/Category.model.js';
import SubCategory from '../models/SubCategory.model.js';

//add new subcategory
//method: POST
//end point : api/subcategory/add
export const addSubCategory = async (req, res) => {
	try {
		const { categoryName, name } = req.body;

		const existingCategory = await Category.findOne({ name: categoryName });

		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Selected category not found' });
		}

		const existingSubCategory = await SubCategory.findOne({ name });

		if (!existingSubCategory) {
			const newSubCategory = new SubCategory({
				name,
				Category: existingCategory._id,
			});

			await newSubCategory.save();
			//push this new subcategory refrence to category's subcategory array
			existingCategory.subCategory.push(newSubCategory._id);
			await existingCategory.save();
		} else {
			//if subcategory is already created then just push category id in category array of subcategory collection and same for category collection
			if (!existingCategory.subCategory.includes(existingSubCategory._id)) {
				existingCategory.subCategory.push(existingSubCategory._id);
				await existingCategory.save();

				existingSubCategory.Category.push(existingCategory._id);
				await existingSubCategory.save();
			} else {
				return res.status(200).json({
					mssg: 'This sub-category already exists for selected categpry',
				});
			}
		}

		return res
			.status(200)
			.json({ mssg: 'New sub-category for this category added successfully' });
	} catch (err) {
		console.log('error in addSubCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//update existing subcategory
//method: POST
//end point : api/subcategory/update
export const updateSubCategory = async (req, res) => {
	try {
		const { categoryId, subCategoryId, name } = req.body;

		const existingCategory = await Category.findById(categoryId);

		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Category not found' });
		}

		const existingSubCategory = await SubCategory.findById(subCategoryId);

		if (!existingSubCategory.Category.includes(categoryId)) {
			return res
				.status(404)
				.json({ error: 'Sub category not found for this category' });
		}

		if (
			existingSubCategory.name === name &&
			existingSubCategory.Category.includes(categoryId)
		) {
			return res
				.status(200)
				.json({ error: 'Sub Category name is same as earlier' });
		}

		const chkSubCategory = await SubCategory.findOne({ name });

		//if we are updating the subcategory with the name which is already there for that category
		if (chkSubCategory) {
			if (existingCategory.subCategory.includes(chkSubCategory._id)) {
				return res
					.status(200)
					.json({
						error: 'This Sub Category already exists for this Category',
					});
			}
		}
		if (existingSubCategory.Category.length === 1) {
			if (!chkSubCategory) {
				await SubCategory.findByIdAndUpdate(subCategoryId, { name });
			} else {
				existingCategory.subCategory.push(chkSubCategory._id);
				await existingCategory.save();

				await SubCategory.findByIdAndDelete(subCategoryId);
			}
		} else {
			if (!chkSubCategory) {
				//create new sub category
				const newSubCategory = new SubCategory({
					name,
					Category: [categoryId],
				});
				await newSubCategory.save();

				//add refrence of this new sub category for category and remove old sub category refrence
				existingCategory.subCategory.push(newSubCategory._id);
				await existingCategory.save();

				const newSubCatArr = existingCategory.subCategory.filter(
					(id) => !id.equals(subCategoryId)
				);
				await Category.findByIdAndUpdate(categoryId, {
					$set: {
						subCategory: newSubCatArr,
					},
				});

				//remove refrence of category from old sub category
				const newCatArr = existingSubCategory.Category.filter(
					(id) => !id.equals(categoryId)
				);
				await SubCategory.findByIdAndUpdate(subCategoryId, {
					$set: {
						Category: newCatArr,
					},
				});
			} else {
				//add refrence of already available sub category for category and remove old sub category refrence
				existingCategory.subCategory.push(chkSubCategory._id);
				await existingCategory.save();

				const newSubCatArr = existingCategory.subCategory.filter(
					(id) => !id.equals(subCategoryId)
				);
				await Category.findByIdAndUpdate(categoryId, {
					$set: {
						subCategory: newSubCatArr,
					},
				});

				//adding refrence of category in already available sub category
				chkSubCategory.Category.push(categoryId);
				await chkSubCategory.save();

				//remove refrence of category from old sub category
				const newCatArr = existingSubCategory.Category.filter(
					(id) => !id.equals(categoryId)
				);
				await SubCategory.findByIdAndUpdate(subCategoryId, {
					$set: {
						Category: newCatArr,
					},
				});
			}
		}

		return res.status(200).json({ mssg: 'sub-category updated successfully' });
	} catch (err) {
		console.log('error in updateSubCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//delete subcategory
//method: POST
//end point : api/subcategory/remove
export const removeSubCategory = async (req, res) => {
	try {
		const { categoryId, subCategoryId } = req.body;

		const existingCategory = await Category.findById(categoryId);
		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Category not found' });
		}

		const existingSubCategory = await SubCategory.findById(subCategoryId);
		if (!existingSubCategory.Category.includes(categoryId)) {
			return res
				.status(404)
				.json({ mssg: 'Sub category not found for this category' });
		}

		if (existingSubCategory.Category.length === 1) {
			await SubCategory.findByIdAndDelete(subCategoryId);
		} else {
			//remove refrence of category from old sub category
			const newCatArr = existingSubCategory.Category.filter(
				(id) => !id.equals(categoryId)
			);
			await SubCategory.findByIdAndUpdate(subCategoryId, {
				$set: {
					Category: newCatArr,
				},
			});
		}
		//remove refrence of that sub category from that category
		const newSubCatArr = existingCategory.subCategory.filter(
			(id) => !id.equals(subCategoryId)
		);
		await Category.findByIdAndUpdate(categoryId, {
			$set: {
				subCategory: newSubCatArr,
			},
		});

		return res.status(200).json({ mssg: 'sub-category deleted successfully.' });
	} catch (err) {
		console.log('error in deleteSubCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

//get all subcategory against category
//method: POST
//end point : api/subcategory/all
export const getAllSubCategory = async (req, res) => {
	try {
		const { category } = req.body;

		const existingCategory = await Category.findOne({
			name: category.trim(),
		}).populate('subCategory');
		if (!existingCategory) {
			return res.status(404).json({ mssg: 'Category not found' });
		}

		const allSubCategories = await SubCategory.find();

		return res
			.status(200)
			.json({ subcategories: existingCategory.subCategory });
	} catch (err) {
		console.log('error in getAllSubCategory controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};
