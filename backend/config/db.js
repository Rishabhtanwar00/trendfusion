import mongoose from 'mongoose';

const ConnectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB!');
	} catch (error) {
		console.log('Error in MongoDB connection: ' + error.message);
	}
};

export default ConnectToDB;
