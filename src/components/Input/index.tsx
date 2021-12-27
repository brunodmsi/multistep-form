import { InputHTMLAttributes, useCallback, useRef, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
}

const Input = ({ name, ...rest }: InputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

	return (
		<div
			className={`${isFilled ? 'border-indigo-500' : isFocused ? 'border-indigo-500' : 'border-black'} rounded-sm bg-white p-1	text-indigo-500 flex items-center border-1 border-opacity-50`}
		>
			<input
				className='flex-1 bg-transparent border-none'
				name={name}
				ref={inputRef}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				{...rest}
			/>
		</div>
	);
}

export default Input;