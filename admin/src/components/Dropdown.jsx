import { useState, useRef, useEffect } from 'react';

const Dropdown = ({
	label = 'Select',
	options = [],
	onSelect = () => {},
	selected,
	className = '',
}) => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown on click outside
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			className={`relative inline-block w-52 ${className}`}
			ref={dropdownRef}
		>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className='w-full bg-white border border-gray-300 rounded-md shadow-sm px-2 py-2 text-left cursor-pointer flex justify-between items-center hover:border-blue-500 focus:outline-none'
			>
				<span>{selected || label}</span>
				<svg
					className={`h-5 w-5 transition-transform duration-300 ${
						open ? 'rotate-180' : ''
					}`}
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'
						clipRule='evenodd'
					/>
				</svg>
			</button>

			{open && (
				<ul className='absolute z-10 mt-1 w-full bg-blue-50 border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto'>
					{options.map((option, index) => (
						<li
							key={index}
							onClick={() => {
								onSelect(option);
								setOpen(false);
							}}
							className='px-4 py-2 hover:bg-blue-100 cursor-pointer transition-colors'
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
