
import { useCallback, useEffect, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useFirebase from "../hooks/useFirebase"
import useTime from "../hooks/useTime"
import { useStore } from "../store/StoreProvider"
import TextEditor from "./TextEditor"


const Question = () => {
  const [store,] = useStore()
  const { editorContent } = store
  const { newAnswer} = useFirebase()
  const { docId } = useParams()

  const { getDocTime, passTime } = useTime()
  const navigate = useNavigate()

  const handleUpdateCurrentDoc = () => {
    if (store.user === null || store.user === undefined) {
      navigate("/iniciar-sesion")
      return
    }
    if(editorContent.length  > 8){
      const res = newAnswer({docId:docId ,text: editorContent } )
      if(res)navigate("/")
    }
  }
console.log(store.questions)

 const singleQuestion = useMemo(()=>{
  const getCurrentDoc = docId => {
    const doc = store.questions?.find((doc)=> doc.id === docId)
    return doc
  }
      return getCurrentDoc(docId)
 },[ store.questions, docId]) 

const docTime = useCallback(()=>{
  return getDocTime(singleQuestion?.Fecha)
},[getDocTime, singleQuestion])


 useEffect(()=>{

  if(!store.questions){
    navigate("/")
  }
  
docTime()
 },[docTime,store.questions,navigate])
  return (
    <div className="container px-2">
      <div className="row">
        <div className="col-md-9 col-lg-9 col-xl-9">
          {/* question haeder */}
          <div className="border-bottom py-3 ">
            <span className="h3">{singleQuestion?.Pregunta}</span>

            <div style={{ "fontSize": "14px" }}>
              <span  >Formulada: {passTime}</span>
            </div>
          </div>
          {/* Question description */}
          <div className="w-100">
            <div  style={{ "fontSize": "18px" }} dangerouslySetInnerHTML={{ __html: singleQuestion?.Descripcion }}></div>
            <div>
              {
                singleQuestion?.Tecnologias.map((tec, index) => <span style={{ "fontSize": "14px" }} className=' bg-info p-1 mx-1' key={index}>{tec}</span>)
              }
            </div>

          </div>

          {/* answers */}
          <div className="my-5 fs-5 w-100">
            <div className="">
              <span>Respuestas: {singleQuestion?.Respuestas.length}</span>
            </div>
            {
              singleQuestion?.Respuestas?.map((answer, index) => (
                <div
                  key={index}
                  className="container border my-3 w-100 ">
                  <div
                    dangerouslySetInnerHTML={{ __html: answer }}
                    className="py-3"
                  ></div>
                </div>
              ))
            }
          </div>
          <div>
            <h6>Responde a esta pregunta</h6>
            <TextEditor />
          </div>


          <div> <button className="btn btn-primary mt-4"
            onClick={handleUpdateCurrentDoc}

          >Publicar tu respuesta</button></div>
        </div>
      </div>
    </div>
  )
}

export default Question