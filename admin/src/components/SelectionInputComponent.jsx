const SelectionInputComponent = ({ label, value, onChange, options }) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			<p className=''>{label}</p>
			<select
				className='px-3 py-2 rounded w-full sm:w-fit min-w-[130px]'
				onChange={onChange}
				value={value}
			>
				{options &&
					options.map((option, index) => (
						<option key={index} value={option.name}>
							{option.name}
						</option>
					))}
			</select>
		</div>
	);
};

export default SelectionInputComponent;
