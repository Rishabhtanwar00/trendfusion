import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/product.model.js';

// to add new product
export const addProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestseller,
		} = req.body;

		const image1 = req.files.image1 && req.files.image1[0];
		const image2 = req.files.image2 && req.files.image2[0];
		const image3 = req.files.image3 && req.files.image3[0];
		const image4 = req.files.image4 && req.files.image4[0];

		const images = [image1, image2, image3, image4].filter(
			(item) => item !== undefined
		);

		const imagesUrl = await Promise.all(
			images.map(async (item) => {
				const result = await cloudinary.uploader.upload(item.path, {
					resource_type: 'image',
				});
				return result.secure_url;
			})
		);

		const productData = {
			name,
			description,
			price: Number(price),
			image: imagesUrl,
			category,
			subCategory,
			sizes: JSON.parse(sizes),
			bestseller: bestseller === 'true' ? true : false,
			date: Date.now(),
		};

		const newProduct = new Product(productData);

		const product = await newProduct.save();

		return res
			.status(200)
			.json({ mssg: 'Product added with id: ' + product._id });
	} catch (err) {
		console.log('error in addProduct controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

// to remove product
export const removeProduct = async (req, res) => {
	try {
		const { id } = req.body;

		await Product.findByIdAndDelete(id);

		return res.status(200).json({ mssg: 'Product Deleted with id: ' + id });
	} catch (err) {
		console.log('error in addProduct controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

// to list all products
export const listProducts = async (req, res) => {
	try {
		const allProducts = await Product.find({});

		return res.status(200).json({ products: allProducts });
	} catch (err) {
		console.log('error in addProduct controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};

// to list single product
export const singleProduct = async (req, res) => {
	try {
		const { productId } = req.body;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		return res.status(200).json({ product });
	} catch (err) {
		console.log('error in addProduct controller: ' + err.message);
		return res.status(500).json({ error: 'Internal sever error' });
	}
};
