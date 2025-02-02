import Product from '../models/product-model.js';
import mongoose from 'mongoose';

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({}); // find({}) retrieves all documents from the collection

		if (products.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: 'No products found' });
		}

		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.error('Error occurs in Get Product');
		res.status(500).json({ success: false, message: 'Server error ' });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; //user will send this data
	if (!product.name || !product.price || !product.image) {
		return res
			.status(400)
			.json({ success: false, message: 'Please provide all the fields ' });
	}

	const newProduct = new Product(product);

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error('Error occurs in Create product: ', error.message);
		res.status(500).json({ success: false, message: 'Error message' });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	//Check if the given id is NOT valid
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(404)
			.json({ success: false, message: 'Invalid Product ID' });
	}

	try {
		//{new: true} give the updated document, by default it is false means before the update
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server Error' });
	}
};

export const deleteProduct = async (req, res) => {
	// const productId = req.params.id
	const { id } = req.params;

	try {
		const deletedProduct = await Product.findByIdAndDelete(id);

		if (!deletedProduct) {
			return res
				.status(404)
				.json({ success: false, message: 'Product not found' });
		}

		res.status(200).json({
			success: true,
			message: `Product deleted: ${deletedProduct.name}`,
		});
	} catch (error) {
		res.status(500).json({ success: false, message: 'Server error' });
	}
};
