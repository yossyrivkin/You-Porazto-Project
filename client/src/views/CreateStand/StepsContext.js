import React, { createContext, useState } from 'react'

export const StepsContext = createContext()

export const StepsProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0)

  const value = {
    activeStep,
    setActiveStep,
  }

  return <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
}
