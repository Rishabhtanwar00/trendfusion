import User from '../models/user.model.js';

//get user Data by Id
//method : POST
//end point - api/user/profile
export const getUserProfile = async (req, res) => {
	try {
		const { userId } = req.body;

		const user = await User.findById(userId).populate({
			path: 'wishlist', // Refers to the field in Category schema
			model: 'product', // Model name for SubCategory
		});

		return res.status(200).json({ user });
	} catch (err) {
		console.log('error in getUserProfile Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//add new address for the user
//method : POST
//end point - api/user/add-address
export const addNewAddress = async (req, res) => {
	try {
		const { userId, address } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		if (address.isDefault) {
			user.addresses.forEach((add) => (add.isDefault = false));
		}

		user.addresses.push(address);
		await user.save();
		return res.status(200).json({ msg: 'Address added successfully.' });
	} catch (err) {
		console.log('error in addNewAddress Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//update address for the user
//method : POST
//end point - api/user/update-address
export const updateAddress = async (req, res) => {
	try {
		const { userId, addressId, address } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		const addressIndex = user.addresses.findIndex(
			(add) => add._id.toString() === addressId
		);

		if (addressIndex === -1) {
			return res.status(200).json({ error: 'Address not found.' });
		}
		if (address.isDefault) {
			user.addresses.forEach((add) => (add.isDefault = false));
		}

		user.addresses[addressIndex] = {
			...user.addresses[addressIndex],
			...address,
		};

		await user.save();
		return res.status(200).json({ msg: 'Address updated successfully.' });
	} catch (err) {
		console.log('error in updateAddress Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//delete address for the user
//method : POST
//end point - api/user/remove-address
export const removeAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		user.addresses = user.addresses.filter(
			(addr) => addr._id.toString() !== addressId
		);

		await user.save();
		return res.status(200).json({ msg: 'Address removed successfully.' });
	} catch (err) {
		console.log('error in removeAddress Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//Make address default for the user
//method : POST
//end point - api/user/default-address
export const markDefaultAddress = async (req, res) => {
	try {
		const { userId, addressId } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		const addressIndex = user.addresses.findIndex(
			(add) => add._id.toString() === addressId
		);

		if (addressIndex === -1) {
			return res.status(200).json({ error: 'Address not found.' });
		}

		user.addresses.forEach((add) => (add.isDefault = false));

		user.addresses[addressIndex].isDefault = true;

		await user.save();
		return res.status(200).json({ msg: 'Address marked as default.' });
	} catch (err) {
		console.log('error in markDefaultAddress Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//add item to wishlist
//method : POST
//end point - api/user/add-wishlist
export const addItemToWishlist = async (req, res) => {
	try {
		const { userId, productId } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		if (user.wishlist.includes(productId)) {
			return res.status(200).json({ error: 'Product already in wishlist.' });
		}
		user.wishlist.push(productId);
		await user.save();
		return res
			.status(200)
			.json({ msg: 'Produt added to wishlist successfully.' });
	} catch (err) {
		console.log('error in addItemToWishlist Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};

//remove item from wishlist
//method : POST
//end point - api/user/remove-wishlist
export const removeItemFromWishlist = async (req, res) => {
	try {
		const { userId, productId } = req.body;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(200).json({ error: 'User not found.' });
		}

		if (!user.wishlist.includes(productId)) {
			return res.status(200).json({ error: 'Product is not in wishlist.' });
		}

		user.wishlist = user.wishlist.filter(
			(item) => item.toString() !== productId
		);

		await user.save();
		return res
			.status(200)
			.json({ msg: 'Produt removed from wishlist successfully.' });
	} catch (err) {
		console.log('error in removeItemFromWishlist Controller: ' + err.message);
		return res.status(500).json({ error: 'Internal server error' });
	}
};
