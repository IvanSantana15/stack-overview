
import {  useParams } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'
import QuestionListItem from './QuestionListItem'

const FilteredQuestion = () => {

const [store] = useStore()
const {search} = useParams()




if(store.filteredQuestion.length <= 0 )return <div className='min-vh-100 py-5 '><span className='bg-info w-75 mt-5 mx-1 z-index-0 p-3'>No hay elementos que coincidan con <b>{search}</b></span></div>
  return (
    <div className='min-vh-100 py-4 px-0 mx-0'>
        {
            store.filteredQuestion?.map(({Pregunta,Tecnologias, Respuestas, id})=>{
                return (
                  <QuestionListItem  key={id} question={Pregunta} Answers={Respuestas} technology={Tecnologias} id={id}/>
                )
            })
        }
    </div>
  )
}

export default FilteredQuestion