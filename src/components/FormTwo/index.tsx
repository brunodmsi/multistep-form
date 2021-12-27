import Form from '../MultistepForm';
import Input from '../Input';
import { useEffect, useState } from 'react';
import MultistepFormItem from '../MultistepFormItem';
import itemHasError from '../../utils/itemHasErrors';

export interface ValuesProps {
	twitter?: string;
	facebook?: string;
}

interface FormTwoProps {
	title: string;
	values: ValuesProps;
	onChange: (field: string, value: any) => void;
	errors: object | undefined;
}

const FormTwo = ({ title = 'Step', values = {}, onChange, errors }: FormTwoProps) => {
	const [data, setData] = useState<ValuesProps>({});
	const [formErrors, setFormErrors] = useState(errors);

	useEffect(() => {
		setData(values);
		setFormErrors(errors);
	}, [values, errors])

	return (
		<Form title={title} onSubmit={() => {}}>
			<MultistepFormItem
				hasError={itemHasError(['twitter'], formErrors)}
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
			</MultistepFormItem>

			<MultistepFormItem
				hasError={itemHasError(['facebook'], formErrors)}
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
			</MultistepFormItem>
		</Form>
	);
}

export default FormTwo;