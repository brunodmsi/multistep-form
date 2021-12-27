import MultistepForm from '../MultistepForm';
import MultistepFormItem from '../MultistepFormItem';
import Input from '../Input';
import { useEffect, useState } from 'react';
import itemHasError from '../../utils/itemHasErrors';

export interface ValuesProps {
	name?: string;
	email?: string;
	teste?: string;
}

interface FormOneProps {
	title: string;
	values: ValuesProps;
	onChange: (field: string, value: any) => void;
	errors: object | undefined;
}

const FormOne = ({ title = 'Step', values = {}, onChange, errors }: FormOneProps) => {
	const [data, setData] = useState<ValuesProps>({});
	const [formErrors, setFormErrors] = useState(errors);

	useEffect(() => {
		setData(values);
		setFormErrors(errors);
	}, [values, errors])

	return (
		<MultistepForm title={title} onSubmit={() => {}}>
			<MultistepFormItem
				hasError={itemHasError(['name'], formErrors)}
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
			</MultistepFormItem>

			<MultistepFormItem
				hasError={itemHasError(['email'], formErrors)}
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

					<h5>Teste</h5>
					<Input 
						name='teste'
						placeholder='teste'
						value={data.teste || ''}
						onChange={e => onChange('teste', e.target.value)}
					/>
				</div>
			</MultistepFormItem>
		</MultistepForm>
	);
}

export default FormOne;