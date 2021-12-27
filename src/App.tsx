import { useCallback, useEffect, useState } from 'react';
import FormOne from './components/FormOne';
import FormTwo from './components/FormTwo';
import Header from './components/Header';
import { getDraftByPrimaryId, updateDraft } from './services/api';

type Details = {
  dev?: string;
}

interface Step {
  type: string;
  reference_id: string;
  name: string;
  details: Details;
  data: object;
}

function App() {
  const [draftId, setDraftId] = useState<string>('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedStepId, setSelectedStepId] = useState<string>('');

  useEffect(() => {
    getDraftByPrimaryId('4657c306-0e14-40d3-b770-6accff5c6027')
      .then(({ data: response }) => {
        const draft = response[0];
        setSteps(draft.data);
        setSelectedStepId(draft.data[0].reference_id);
        setDraftId(draft.id);
      })
  }, []);

  const onSaveDraft = useCallback(() => {
    updateDraft(draftId, { data: steps })
  }, [draftId, steps])

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
      return <FormOne title={actualStep.name} values={actualStep.data} onChange={onChangeFields} />
    if (actualStep.type === 'form_2') 
      return <FormTwo title={actualStep.name} values={actualStep.data} onChange={onChangeFields} />
  }

  return (
    <>
      <Header />

      <div className="flex flex-col w-full">
        <div className="mt-5 grid grid-cols-3 gap-8 max-w-2xl w-full mx-auto">
          <div className="grid grid-rows-3 col-span-1 grid-cols-1 gap-5">
            {steps.map(step => (
              <div
                key={step.reference_id}
                className={`p-3 text-white rounded-md cursor-pointer ${selectedStepId === step.reference_id ? 'bg-indigo-500' : 'bg-gray-400 hover:bg-gray-600 transition-colors'}`}
                onClick={() => setSelectedStepId(step.reference_id)}
              >
                <p className="text-white">{step.name}</p>
                <div className={`${Object.keys(step.details).length === 0 ? 'appearance-none' : 'text-sm'}`}>
                  {step.details.dev && (
                    <span>Dev: {step.details.dev}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-2">
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
