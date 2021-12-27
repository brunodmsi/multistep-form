import { useState } from 'react';
import FormOne from './components/FormOne';
import Header from './components/Header';

const steps: Step[] = [
  {
    type: 'form_1',
    id: 1,
    name: 'Step 1',
    details: {
      dev: 'bruno'
    },
    data: {}
  },
  {
    type: 'form_1',
    id: 2,
    name: 'Step 2',
    details: {},
    data: {}
  },
  {
    type: 'form_2',
    id: 3,
    name: 'Step 3',
    details: {},
    data: {}
  },
];

type Details = {
  dev?: string;
}

interface Step {
  type: string;
  id: number;
  name: string;
  details: Details;
  data: object;
}

function App() {
  const [selectedStep, setSelectedStep] = useState<Step>(steps[0]);

  return (
    <>
      <Header />

      <div className="mt-5 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
        <div className="grid grid-rows-3 col-span-1 grid-cols-1 gap-5">
          {steps.map(step => (
            <div
              key={step.id}
              className={`p-3 text-white rounded-md cursor-pointer ${selectedStep.id === step.id ? 'bg-indigo-500' : 'bg-gray-400 hover:bg-gray-600 transition-colors'}`}
              onClick={() => setSelectedStep(step)}
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
          {selectedStep.type === 'form_1' && (
            <FormOne title={selectedStep.name} />
          )} 
          {selectedStep.type === 'form_2' && (
            <FormOne title={selectedStep.name} />
          )} 
        </div>
      </div>
    </>
  )
}

export default App;
