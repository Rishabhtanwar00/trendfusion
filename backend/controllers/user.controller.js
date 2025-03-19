import User from '../models/user.model.js';

//get user Data by Id
//method : POST
//end point - api/user/profile
export const getUserProfile = async (req, res) => {
	try {
		const { userId } = req.body;

		const user = await User.findById(userId);

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
