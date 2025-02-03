import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product-route.js';

dotenv.config(); //this allows us to use the MongoDB url

const app = express();
const HOST = process.env.PORT || 8000;

// route
// app.get('/', (req, res) => {
// 	res.send('server is ready');
// });

// console.log(process.env.MONGO_URI); this calls the mongoDB url
// test your api with Postman
app.use(express.json()); //middleware to parse JSON body

//it prefix by ' /api/products ' in the productRoutes
app.use('/api/products', productRoutes);

app.listen(HOST, () => {
	connectDB();
	console.log(`Server started at http://localhost:${HOST} `);
});
