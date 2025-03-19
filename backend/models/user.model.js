import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	street: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	pincode: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	isDefault: {
		type: Boolean,
		default: false,
	},
});

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		addresses: [addressSchema],
		cartData: {
			type: Object,
			default: {},
		},
	},
	{
		minimize: false,
	}
);

const User = mongoose.model('user', UserSchema);

export default User;
