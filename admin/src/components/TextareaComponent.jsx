const TextareaComponent = ({
	label,
	value,
	placeholder,
	onChange,
	required,
	rows,
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className=''>{label}</p>
			<textarea
				className='px-3 py-2 w-full sm:w-[500px] rounded'
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				required={required}
				rows={rows}
			/>
		</div>
	);
};

export default TextareaComponent;
