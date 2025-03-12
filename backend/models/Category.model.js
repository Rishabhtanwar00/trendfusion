import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		subCategory: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SubCategory',
			},
		],
	},
	{ timestamps: true }
);

const Category = new mongoose.model('Category', CategorySchema);

export default Category;
