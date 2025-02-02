import mongoose from 'mongoose';
// todo: create schema and export as a model

// create a schema for a product
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, //MongoDb automatically creates createdAt, updatedAt
	}
);

// this creates a model 'Product' using schema 'productSchema'
//use capital and singular form name for a model
const Product = mongoose.model('Product', productSchema);

export default Product;
