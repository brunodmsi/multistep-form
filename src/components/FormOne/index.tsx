import Form from '../MultistepForm';
import Input from '../Input';

const FormOne = ({ title = 'Step 1' }) => {
	return (
		<Form title={title} onSubmit={() => {}}>
			<div
				className="bg-white p-4 flex"
			>
				<div>
					<h4>Nome</h4>
					<Input 
						name='nome'
						placeholder='nome'
					/>
				</div>
			</div>
		</Form>
	);
}

export default FormOne;