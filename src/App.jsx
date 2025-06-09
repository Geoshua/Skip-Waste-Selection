import { useState } from 'react'
import './App.css'
import {   SkipSizeSelector, SteppedProgressBar,
  SteppedProgressButtons, } from './components'

function App() {

  const [step, setStep] = useState(0);

  return (
    <>
    <div className="h-screen">
    <div className="w-full p-10 float-start">

      <SteppedProgressBar currentStep={step} />


    </div>
    <div class="w-full h-1/2">
      <div className="items-center">
        <h2 className="text-2xl text-white font-semibold">Choose Skip Size</h2>
        <p className="text-lg text-gray-400">Select the skip size that best suits your needs</p>
      </div>
    </div>
    <h1 class="text-green text-4xl bold">test</h1>
    <div>
      <SkipSizeSelector/>
    </div>
      <SteppedProgressButtons
        currentStep={step}
        totalSteps={6}
        onStepChange={setStep}
      />
    </div></>
  )
}


export default App
