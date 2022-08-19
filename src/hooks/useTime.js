import  { useEffect, useState } from 'react'

const useTime = () => {

  const [value, setValue] = useState(null)
  const [passTime, setPassTime] = useState("")


  useEffect(() => {


    const createdAt = () => {

      const timeSecons = value?.toDate().getTime() / 1000
      const currrentTimeSecons = new Date().getTime() / 1000
      
      let passedTime = (currrentTimeSecons - timeSecons) / 60
      if (passedTime < 1) {
        setPassTime("Hace menos de un minuto")
        return
      } else if (passedTime > 1 && passedTime < 60) {
        setPassTime(`hace ${Math.floor(passedTime)} minutos`)
        return
      } else if (passedTime / 60 >= 1 && passedTime / 60 < 24 ) {
        setPassTime(`hace ${Math.floor(passedTime/60)} horas`)
        return
      } else if (passedTime / 60 / 24 >= 1) {
        setPassTime(`Hace ${Math.floor(passedTime / 60 / 24)} dias`)
        return
      } else if (passedTime / 24 / 30 >= 1) {
        setPassTime(`Hace ${Math.floor(passedTime)} mes(es)`)
        return
      }
    }

    createdAt()
  }, [value])

  const getDocTime = (timestamp) => {
    setValue(timestamp)
  }

  return (
    {
      value,
      getDocTime,
      passTime
    }
  )
}

export default useTime