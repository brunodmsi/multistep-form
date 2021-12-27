import React from "react";

interface FormProps {
	hasError: boolean;
}

const MultistepFormItem: React.FC<
	FormProps & React.HTMLAttributes<HTMLDivElement>
> = ({ children, hasError = false }) => {
	return (
		<div
			className={`bg-white p-4 flex rounded-md ${hasError ? 'border-red-500 border-2' : ''}`}
		>
			{children}
		</div>
	);
}

export default MultistepFormItem;