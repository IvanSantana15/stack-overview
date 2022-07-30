import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'
import useFirebase from "../hooks/useFirebase"

const MainContent = () => {
  const [store] = useStore()
  const {questions} = store

  const {getQuestions } = useFirebase()

    useEffect(()=>{
    
   getQuestions()
    },[])
  return (
    <div>
        {
            questions?.map(({question,tecnologias, answers, id})=>{
                return (<div
                        className='d-flex row border p-2 mx-1 my-2'
                        key={id}>
                          <div className="col-md-2">
                            <span
                            className={answers.length > 0? "border border-success  fs-6 font-weight-light" : ""}
                            >Repuestas: {answers.length}</span>
                        </div> 

                        <div className="col-md-10">
                        
                      <Link className="text-decoration-none" to={`/preguntas/${id}`}><span className='h4 d-block'>{question}</span> </Link> 
                        {tecnologias.map((tecnologia, index)=><span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tecnologia}</span> )}
                        </div> 
                    </div>)
            })
        }
    </div>
  )
}

export default MainContent