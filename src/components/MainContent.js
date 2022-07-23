import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import {collection, getDocs}from "firebase/firestore"
import { Link } from 'react-router-dom'

const MainContent = () => {
 const [questions, setQuestions] = useState(null)
 const questionsCollectionRef = collection(db,"questions") 

console.log(questions)
    useEffect(()=>{
        const getQuestions = async()=>{
            const data = await getDocs(questionsCollectionRef)
            setQuestions(data.docs.map((doc)=> ({...doc.data(),id: doc.id})))
        }

        getQuestions()
    },[])
  return (
    <div>
        {
            questions?.map(({question,tecnologias, answers, id})=>{
                return (<div
                        className='d-flex row border  p-2 mx-1 my-2 '
                        key={id}>
                          <div className="col-md-auto">
                            <span
                            className={answers.length > 0? "border border-success  fs-6 font-weight-light" : ""}
                            >Repuestas: {answers.length}</span>
                        </div> 

                        <div className=" col-md-10 ">
                        
                      <Link className="text-decoration-none" to={`/preguntas/${id}`}><span className=' w-75 h4 d-block'>{question}</span> </Link> 
                        {tecnologias.map((tecnologia, index)=><span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tecnologia}</span> )}
                        </div> 
                    </div>)
            })
        }
    </div>
  )
}

export default MainContent