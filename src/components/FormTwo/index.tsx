import Form from '../MultistepForm';
import Input from '../Input';
import { useEffect, useState } from 'react';

export interface ValuesProps {
	twitter?: string;
	facebook?: string;
}

interface FormTwoProps {
	title: string;
	values: ValuesProps;
	onChange: (field: string, value: any) => void;
}

const FormTwo = ({ title = 'Step', values = {}, onChange }: FormTwoProps) => {
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
					<h4>Twitter</h4>
					<Input 
						name='name'
						placeholder='e.g brunodmsi'
						value={data.twitter || ''}
						onChange={e => onChange('twitter', e.target.value)}
					/>
				</div>
			</div>

			<div
				className="bg-white p-4 flex rounded-md border-red-500 border-2"
			>
				<div>
					<h4>Facebook</h4>
					<Input 
						name='facebook'
						placeholder='facebook'
						value={data.facebook || ''}
						onChange={e => onChange('facebook', e.target.value)}
					/>
				</div>
			</div>
		</Form>
	);
}

export default FormTwo;