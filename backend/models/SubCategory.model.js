import mongoose from 'mongoose';

const SubCategorySchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		Category: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category',
				required: true,
			},
		],
	},
	{ timestamps: true }
);

const SubCategory = new mongoose.model('SubCategory', SubCategorySchema);

export default SubCategory;
