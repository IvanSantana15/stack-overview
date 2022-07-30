import React, { createContext, useContext, useReducer } from 'react'
import storeReducer, { inicialStore } from './storeReducer'

const StoreContext = createContext()

const useStore = ()=> useContext(StoreContext)

const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(storeReducer, inicialStore)

  return (
    <StoreContext.Provider value={[store, dispatch]} >
        {children}
    </StoreContext.Provider>
  )
}

export {useStore}
export default StoreProvider