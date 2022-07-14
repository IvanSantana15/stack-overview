import React, { useEffect, useState } from 'react'

const useTime = (timestamp) => {

const [value , setValue] = useState("")
  const timeSecons =  timestamp.toDate().getTime()/1000
  const currrentTimeSecons = new Date().getTime()/1000
  const passedTime = currrentTimeSecons - timeSecons

    const createdAt = ()=>{
        if(passedTime < 1 ){
            setValue("Hace menos de un segundo")
            return
        }
        if(passedTime < 1 && passedTime < 5 ){
            setValue("hace menos de 5 segundos")
            return
        }
        if(passedTime < 60 ){
            setValue("Hace menos de un minuto")
            return
        }
        if(passedTime / 60 >=  1 && passedTime / 60 <  60){
            setValue(`Hace ${passedTime / 60}`)
            return
        }
        
    }
    useEffect(()=>{
      createdAt()
    })


  return (
    {value}
  )
}

export default useTime