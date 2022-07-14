import { collection, getDocs, Timestamp, getDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase"
import useTime from "../hooks/useTime"


const Question = () => {
 const {id} =  useParams()
 const [question , setQuestion] = useState(null)
 const questionsDocRef = doc(db,"questions", id)
 //const {value}= useTime()


 useEffect(()=>{
  const getQuestion = async()=>{


      const data = await getDoc(questionsDocRef)
      
      console.log(data.data())
     // console.log(data.docs.map(doc => doc.data()))
     setQuestion(data.data())
     
  }

  getQuestion()
  

 //console.log( question.fecha.toDate().getTime())
},[])
  return (
    <div className="container">
      {/* question haeder */}
      <div className="border-bottom py-3">
         <span className="h3">{question?.question}</span> 
         <div>  
          <span className="fs-6">Formulada: </span>
         </div>
      </div>
      {/* Question description */}
      <div>
        <div>{question?.description}</div>
        <div>
          {
          question?.tecnologias.map((tec, index) => <span className='fs-6 bg-info p-1' key={index}>{tec}</span>)
          }
        </div>

      </div>

      {/* answers */}
      <div>
        <div>
          <span>Respuestas: {question?.answers.length}</span>
        </div>
        {
          question?.answers.map((answer, index)=> (
            <div key={index}
              className="py-3"
            >{answer}</div>
          ))
        }
      </div>


    </div>
  )
}

export default Question