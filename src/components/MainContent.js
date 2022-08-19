import {  useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'
import useFirebase from "../hooks/useFirebase"

const MainContent = () => {
  const [store] = useStore()
  const { questions } = store

  const { getQuestions } = useFirebase()

 const getQuestionsCallback = useCallback(()=>{
  getQuestions()
 },[getQuestions])

  useEffect(() => {
    getQuestionsCallback()
    
  }, [getQuestionsCallback ])
  return (
    <div className=' min-vh-100'>
      <div className='d-flex justify-content-between py-3'>
        <div className='mt-3'>
          <h4 className='px-3 text-justify'>Todas las preguntas</h4>
          <span className='px-3'> {questions?.length} preguntas</span>
        </div>
        <div className=" mx-3 px-3">
          <Link to={"/nueva-pregunta"} className='btn btn-primary btn-sm p-md-3 p-sm-1'>Hacer una pregunta</Link>
        </div>
      </div>


      <div
        className='d-flex row   '
      >
        {
          questions?.map(({ Pregunta, Tecnologias, Respuestas, id }) => {
            return (
              <div className='row py-3 border-top mx-0' key={id}>

                <div className="col-md-auto  ">
                  <span
                    className={Respuestas.length > 0 ? "border border-success  fs-6 font-weight-light" : ""}
                  >Repuestas: {Respuestas.length}</span>
                </div>

                <div className="col-md-8  ">

                  <Link className="text-decoration-none" to={`/preguntas/${id}`}><span style={{ "fontSize": "20px" }} className='h6 d-block'>{Pregunta}</span> </Link>
                  {Tecnologias.map((tecnologia, index) => <span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tecnologia}</span>)}
                </div>
              </div>
            )
          })

        }
      </div>

    </div>
  )
  
}

export default MainContent