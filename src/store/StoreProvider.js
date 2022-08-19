import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { auth } from '../firebase'
import storeReducer, { inicialStore, types } from './storeReducer'

const StoreContext = createContext()

const useStore = ()=> useContext(StoreContext)

const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(storeReducer, inicialStore)



 useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
        dispatch({type: types.setUser, payload: user})
            
            
        })
    },[store.user])
  return (
    <StoreContext.Provider value={[store, dispatch]} >
        {children}
    </StoreContext.Provider>
  )
}

export {useStore}
export default StoreProvider