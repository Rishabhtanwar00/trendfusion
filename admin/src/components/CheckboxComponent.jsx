const CheckboxComponent = ({ label, checked, onChange }) => {
	return (
		<div className='flex gap-2 items-center'>
			<input
				id='checkbox'
				type='checkbox'
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor='checkbox'>{label}</label>
		</div>
	);
};

export default CheckboxComponent;
