
import { collection, getDocs, Timestamp, getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase"
import useFirebase from "../hooks/useFirebase"
import useTime from "../hooks/useTime"
import { useStore } from "../store/StoreProvider"
import { types } from "../store/storeReducer"
import TextEditor from "./TextEditor"


const Question = () => {
  const [store, dispatch] = useStore()
  const {singleQuestion, editorContent} = store
  const {getSingleDoc, updateCurrrentDoc} = useFirebase()

  const { docId } = useParams()
 
  const { user } = useAuth()


  const questionsDocRef = collection(db, 'questions');
  const { value, getDocTime, passTime } = useTime()
  const navigate = useNavigate()

  const handleUpdateCurrentDoc =  () => {
    if (user== null) {
      navigate("/iniciar")
      return
    }
    updateCurrrentDoc({docId: docId,data:{answers: arrayUnion(editorContent)}})
  } 
   
  useEffect(() => {
   // getDocTime(data.data().fecha)
    getSingleDoc(docId)

  }, [])

  return (
    <div className="container">
 
      {/* question haeder */}
      <div className="border-bottom py-3 w-75">
        <span className="h3">{singleQuestion?.question}</span>

        <div style={{ "fontSize": "14px" }}>
          <span  >Formulada: {passTime}</span>
        </div>
      </div>
      {/* Question description */}
      <div className="w-75">
        <div className="fs-4" dangerouslySetInnerHTML={{__html: singleQuestion?.description}}></div>
        <div>
          {
            singleQuestion?.tecnologias.map((tec, index) => <span  style={{ "fontSize": "14px" }} className=' bg-info p-1' key={index}>{tec}</span>)
          }
        </div>

      </div>

      {/* answers */}
      <div className="my-5 fs-5 w-75">
        <div className="">
          <span>Respuestas: {singleQuestion?.answers.length}</span>
        </div>
        {
          singleQuestion?.answers.map((answer, index) => (
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
      <TextEditor  />
      </div>
     

      <div> <button className="btn btn-primary mt-4"
        onClick={handleUpdateCurrentDoc}
          
        >Publicar tu respuesta</button></div>
    </div>
  )
}

export default Question