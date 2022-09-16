import {  useCallback, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'
import useFirebase from "../hooks/useFirebase"
import QuestionListItem from './QuestionListItem'

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
        className='d-flex row'
      >
        {
          questions?.map(({ Pregunta,Respuestas, Tecnologias, id }) => {
            return (
             <QuestionListItem  key={id} question={Pregunta} Answers={Respuestas} technology={Tecnologias} id={id}/>
            )
          })

        }
      </div>

    </div>
  )
  
}

export default MainContent