import express from 'express';

import {
	getProducts,
	createProduct,
	updateProduct,
	deleteProduct,
} from '../controllers/product-controller.js';

const router = express.Router();

//get all the products
router.get('/', getProducts);

// this creates a product
router.post('/', createProduct);

//this update the product | 2 types of Update
// put - to update whole new document, rests the field |
// patch - updates partial field and keeps the unchanged field
router.put('/:id', updateProduct);

// ':id' means dynamic id value
router.delete('/:id', deleteProduct);

export default router;
