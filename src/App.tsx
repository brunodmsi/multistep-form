import { useCallback, useEffect, useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import * as Yup from 'yup';
import FormOne from './components/FormOne';
import FormTwo from './components/FormTwo';
import Header from './components/Header';
import { useToast } from './hooks/toast';
import { getDraftByPrimaryId, updateDraft } from './services/api';
import getValidationErrors from './utils/getValidationErrors';

type Details = {
  dev?: string;
}

interface Step {
  type: string;
  reference_id: string;
  name: string;
  details: Details;
  data: object;
  errors?: object;
}

interface ErrorData {
  reference_id: string;
  errors: object;
}

interface Error {
  hasError: boolean;
  type: 'draft' | 'save';
  data: ErrorData[];
}

const form1Schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
});

const form2Schema = Yup.object().shape({
  twitter: Yup.string().required(),
  facebook: Yup.string().required(),
})

function App() {
  const [draftId, setDraftId] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<string>('');
  const [errors, setErrors] = useState<Error>({
    hasError: false,
    type: 'draft',
    data: []
  });

  const { addToast } = useToast()

  useEffect(() => {
    getDraftByPrimaryId('4657c306-0e14-40d3-b770-6accff5c6027')
      .then(({ data: response }) => {
        const draft = response[0];
        setSteps(draft.data);
        setSelectedStepId(draft.data[0].reference_id);
        setDraftId(draft.id);
      })
  }, [addToast]);

  const getErrorByReferenceId = (id: string) => {
    if (!errors.hasError || errors.data.length === 0) 
      return undefined;

    return errors.data.find(stepError => stepError.reference_id === id)?.errors;
  }

  const onSaveDraft = useCallback(async () => {
    const draftErrorSteps: ErrorData[] = [];

    for (let step of steps) {
      try {
        if (step.type === 'form_1') {
          await form1Schema.validate(step.data, {
            abortEarly: false
          });
        } else if (step.type === 'form_2') {
          await form2Schema.validate(step.data, {
            abortEarly: false
          });
        }
      } catch (err) {
        let errors;
        if (err instanceof Yup.ValidationError) {
          errors = getValidationErrors(err);
        }

        draftErrorSteps.push({
          reference_id: step.reference_id,
          errors: errors || {}
        });
      }
    }

    if (draftErrorSteps.length > 0) {
      setErrors({
        hasError: true,
        type: 'draft',
        data: draftErrorSteps,
      })

      addToast({
        title: 'Salvo com campo(s) sem resposta(s)/invalido(s)',
        description: "O relatorio foi salvo com campos apresentando erros:\n" + draftErrorSteps.map(error => Object.keys(error.errors).join(', ')),
        type: 'warning'
      });
    }

    updateDraft(draftId, { 
      data: steps
    });
  }, [draftId, steps, addToast])

  const onChangeFields = useCallback((field: string, value: any) => {
    const actualStepIdx = steps.findIndex(step => selectedStepId === step.reference_id);

    const updatedData = {
      ...steps[actualStepIdx].data,
      [field]: value
    };

    setSteps((oldSteps) => {
      const tmp = [...oldSteps]
      tmp[actualStepIdx].data = updatedData 
      return tmp;
    }) 
  }, [steps, selectedStepId, setSteps]);

  const renderForm = (id: string) => {
    const actualStep = steps.find(step => id === step.reference_id); 
    if (!actualStep) return;

    if (actualStep.type === 'form_1') 
      return (
        <FormOne 
          title={actualStep.name} 
          values={actualStep.data} 
          onChange={onChangeFields} 
          errors={getErrorByReferenceId(actualStep.reference_id)}
        />
      )
    if (actualStep.type === 'form_2') 
      return (
        <FormTwo
          title={actualStep.name} 
          values={actualStep.data} 
          onChange={onChangeFields} 
          errors={getErrorByReferenceId(actualStep.reference_id)}
        />
      )
  }

  return (
    <>
      <Header />

      <div className="flex flex-col w-full">
        <div className="mt-5 flex flex-row gap-8 max-w-4xl w-full mx-auto">
          <div className="h-fit grid grid-rows-3 grid-cols-1 gap-5">
            {steps.map(step => (
              <div
                key={step.reference_id}
                className={`flex flex-row items-center justify-between p-3 w-32 text-white rounded-sm cursor-pointer ${selectedStepId === step.reference_id ? 'bg-indigo-500' : 'bg-gray-400 hover:bg-gray-600 transition-colors'}`}
                onClick={() => setSelectedStepId(step.reference_id)}
              >
                <p className="text-white">{step.name}</p>
                {
                  getErrorByReferenceId(step.reference_id) && (
                    errors.type === 'draft' 
                      ? <FaExclamationCircle className="text-yellow-500" /> 
                      : <FaExclamationCircle className="text-red-500" /> 
                  )
                }
              </div>
            ))}
          </div>

          <div className="w-full">
            {renderForm(selectedStepId)}
          </div>
        </div>

        <div className="grid grid-rows-1 grid-cols-2 mx-auto mt-4">
          <button
            className="border-indigo-500 border-1 p-3 rounded-md text-indigo-500 hover:font-bold transition-all mr-2"
            onClick={onSaveDraft}
          >
            Save draft
          </button>
          <button
            className="bg-indigo-500 p-3 rounded-md text-white hover:bg-indigo-600 transition-colors"
            onClick={() => {}}
          >
            Save
          </button>
        </div>
      </div>
    </>
  )
}

export default App;
