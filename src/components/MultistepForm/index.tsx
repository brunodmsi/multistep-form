import React from "react";

interface FormProps {
	title: string;
	onSubmit: () => void;
}

const MultistepForm: React.FC<
	FormProps & React.HTMLAttributes<HTMLFormElement>
> = ({ children, onSubmit, title }) => {
	return (
		<div className="flex flex-col justify-center items-center bg-indigo-500 p-4 rounded-sm">
			<h3 className="text-white text-lg font-bold">{title}</h3>

			<form 
				className="mt-3 w-full flex flex-col gap-4 justify-around"
				onSubmit={onSubmit}
			>
				{children}
			</form>
		</div>
	)
}

export default MultistepForm;