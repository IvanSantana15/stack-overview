import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'

const FilteredQuestion = () => {
const [store] = useStore()
const {search} = useParams()

if(store.filteredQuestion.length <= 0 )return <div className='alert alert-success w-75'>No hay elementos que coincidan con <b>{search}</b></div>
  return (
    <div>
        {
            store.filteredQuestion?.map(({question,tecnologias, answers, id})=>{
                return (<div
                        className='d-flex row border w-75 p-2 mx-1 my-2'
                        key={id}>
                          <div className="col-2">
                            <span
                            className={answers.length > 0? "border border-success  fs-6 font-weight-light" : ""}
                            >Repuestas: {answers.length}</span>
                        </div> 

                        <div className="col-10">
                        
                      <Link to={`/preguntas/${id}`}><span className='h4 d-block'>{question}</span> </Link> 
                        {tecnologias.map((tecnologia, index)=><span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tecnologia}</span> )}
                        </div> 
                    </div>)
            })
        }
    </div>
  )
}

export default FilteredQuestion