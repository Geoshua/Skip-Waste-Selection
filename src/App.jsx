import { useState } from 'react'
import './App.css'
import {   SkipSizeSelector, SteppedProgressBar,
  SteppedProgressButtons, } from './components'

function App() {

  const [step, setStep] = useState(0);

  return (
    <>
    <div className="lg:h-full">
      <div className="w-full p-10 float-start">

        <SteppedProgressBar currentStep={step} />


      </div>
      <div class="w-full ">
        <div className="items-center">
          <h2 className="text-2xl text-white font-semibold">Choose Skip Size</h2>
          <p className="text-lg text-gray-400">Select the skip size that best suits your needs</p>
        </div>
      </div>
      <div>
        <SkipSizeSelector/>
      </div>
        <SteppedProgressButtons
          currentStep={step}
          totalSteps={6}
          onStepChange={setStep}
        />
      <div class="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
          <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">About</a>
              </li>
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
              </li>
              <li>
                  <a href="#" class="hover:underline">Contact</a>
              </li>
          </ul>
          </div>
      </div>      
    </div>
    



    </>
  )
}


export default App
