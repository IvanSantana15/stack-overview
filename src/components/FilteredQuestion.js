
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/StoreProvider'

const FilteredQuestion = () => {
const [store] = useStore()
const {search} = useParams()


if(store.filteredQuestion.length <= 0 )return <div className='min-vh-100 py-5 '><span className='bg-info w-75 mt-5 mx-1 z-index-0 p-3'>No hay elementos que coincidan con <b>{search}</b></span></div>
  return (
    <div className='min-vh-100'>
        {
            store.filteredQuestion?.map(({Pregunta,Tecnologias, Respuestas, id})=>{
                return (<div
                        className='d-flex row border w-100  mx-1 my-2  '
                        key={id}>
                          <div className="col-md-auto p-1">
                            <span
                            className={Respuestas.length > 0? "border border-success  fs-6 font-weight-light" : ""}
                            >Repuestas: {Respuestas.length}</span>
                        </div> 

                        <div className="col-10 ">
                        
                      <Link className="text-decoration-none" to={`/preguntas/${id}`}><span className='h4 d-block'>{Pregunta}</span> </Link> 
                        {Tecnologias.map((tecnologia, index)=><span style={{ "fontSize": "12px" }} className=' m-2 bg-info p-1' key={index}>{tecnologia}</span> )}
                        </div> 
                    </div>)
            })
        }
    </div>
  )
}

export default FilteredQuestion