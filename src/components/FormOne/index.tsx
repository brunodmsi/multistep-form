import Form from '../MultistepForm';
import Input from '../Input';
import { useEffect, useState } from 'react';

export interface ValuesProps {
	name?: string;
	email?: string;
}

interface FormOneProps {
	title: string;
	values: ValuesProps;
	onChange: (field: string, value: any) => void;
}

const FormOne = ({ title = 'Step', values = {}, onChange }: FormOneProps) => {
	const [data, setData] = useState<ValuesProps>({});

	useEffect(() => {
		setData(values);
	}, [values])

	return (
		<Form title={title} onSubmit={() => {}}>
			<div
				className="bg-white p-4 flex rounded-md border-yellow-500 border-2"
			>
				<div>
					<h4>Nome</h4>
					<Input 
						name='name'
						placeholder='e.g Jorge'
						value={data.name || ''}
						onChange={e => onChange('name', e.target.value)}
					/>
				</div>
			</div>

			<div
				className="bg-white p-4 flex rounded-md border-red-500 border-2"
			>
				<div>
					<h4>Email</h4>
					<Input 
						name='email'
						placeholder='email'
						type='email'
						value={data.email || ''}
						onChange={e => onChange('email', e.target.value)}
					/>
				</div>
			</div>
		</Form>
	);
}

export default FormOne;