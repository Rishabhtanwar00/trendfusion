import { assets } from '../assets/assets';

const ImageUploader = ({ id, image, setImage }) => {
	return (
		<label htmlFor={id} className=''>
			<img
				loading='lazy'
				className='w-20'
				src={image ? URL.createObjectURL(image) : assets.uploadIcon}
				alt='Upload icon'
				onError={(e) => {
					e.target.src = assets.uploadIcon;
				}}
			/>
			<input
				onChange={(e) => setImage(e.target.files[0])}
				id={id}
				type='file'
				hidden
			/>
		</label>
	);
};

export default ImageUploader;
