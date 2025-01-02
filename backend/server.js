import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import ConnectToDB from './config/db.js';
import ConnectToCloudinary from './config/cloudinary.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

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

app.listen(port, () => {
	console.log('server started at PORT: ' + port);
});
