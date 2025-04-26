const InputComponent = ({
	label,
	value,
	placeholder,
	type,
	onChange,
	required,
	small,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className=''>{label}</p>
			<input
				type={type}
				className='px-3 py-2 w-full sm:w-[500px] rounded'
				style={{ width: `${small && '150px'}` }}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				required={required}
			/>
		</div>
	);
};

export default InputComponent;
