import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectToDB from './config/db.js';
import ConnectToCloudinary from './config/cloudinary.js';

import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import orderRoutes from './routes/order.routes.js';

//app configuration
const app = express();
const port = process.env.PORT || 4000;

//db connection
ConnectToDB();
ConnectToCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api end points
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.listen(port, () => {
	console.log('server started at PORT: ' + port);
});
