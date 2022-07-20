
import { collection, getDocs, Timestamp, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import useTime from "../hooks/useTime"
import TextEditor from "./TextEditor"




const Question = () => {
  const { id } = useParams()
  const [question, setQuestion] = useState(null)
  const { user } = useAuth()
  const [textEditorContent, setTextEditorContent] = useState(null)


  console.log(id)
  const questionsDocRef = collection(db, 'questions');
  const { value, getDocTime, passTime } = useTime()
  const navigate = useNavigate()


  const newAnswer = async (editorContent) => {
    console.log(user)
    if (!user) {
      navigate("/iniciar")
      return
    }
    const questionRef = doc(db, 'questions', id)
    await updateDoc(questionRef, { answers: arrayUnion(editorContent) })

  }
  useEffect(() => {
    const getQuestion = async () => {
      const docRef = doc(db, 'questions', id)
      const data = await getDoc(docRef)

      console.log(data.data())
      // console.log(data.docs.map(doc => doc.data()))
      setQuestion(data.data())
      getDocTime(data.data().fecha)

    }

    getQuestion()

  }, [])

  return (
    <div className="container">
      {/* question haeder */}
      <div className="border-bottom py-3 w-75">
        <span className="h3">{question?.question}</span>

        <div style={{ "fontSize": "14px" }}>
          <span  >Formulada: {passTime}</span>
        </div>
      </div>
      {/* Question description */}
      <div className="w-75">
        <div className="fs-4" dangerouslySetInnerHTML={{__html: question?.description}}></div>
        <div>
          {
            question?.tecnologias.map((tec, index) => <span  style={{ "fontSize": "14px" }} className=' bg-info p-1' key={index}>{tec}</span>)
          }
        </div>

      </div>

      {/* answers */}
      <div className="my-5 fs-5 w-75">
        <div className="">
          <span>Respuestas: {question?.answers.length}</span>
        </div>
        {
          question?.answers.map((answer, index) => (
            <div 
            key={index}
            className="container border my-3">
              <div 
                dangerouslySetInnerHTML={{ __html: answer }}
                className="py-3"
              ></div>
            </div>
          ))
        }
      </div>
      <div className="w-75">
      <TextEditor getEditorContent={setTextEditorContent}  />
      </div>
     

      <div> <button className="btn btn-primary mt-4"
        onClick={()=> newAnswer(textEditorContent) }
        >Publicar tu respuesta</button></div>
    </div>
  )
}

export default Question