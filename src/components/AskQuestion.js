import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import useFirebase from '../hooks/useFirebase'
import { useStore } from '../store/StoreProvider'
import { types } from '../store/storeReducer'
import TextEditor from './TextEditor'

const AskQuestion = () => {
    const [store, dispatch] = useStore()
    const {questionFormData, editorContent}= store
    const {createNewQuestion} = useFirebase()
    const questionCollectionRef = collection(db, "questions")

    return (
        <div className='Container'>
            <div className='row'>
                <div className='col-md-9 col-lg-9'>
                <h2 className='mx-2'>Formular una pregunta</h2>

                <div className=' border p-3 mt-5'>

                    <div className='d-block'>
                        <span className='fs-3'>Titulo</span>
                    </div>
                    <div className="input-group mb-3">

                    <input type="text" className="form-control"
                        placeholder="Has una pregunta?"
                        aria-label="Username"
                        aria-describedby="basic-addon1" 
                        onChange={(e)=> dispatch({type: types.newQuestionFormDataTitle, payload:e.target.value })}
                        />
                        
                </div>

                <div className=''>
                    <span className='fs-3'>Cuerpo</span>
                    <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Incluye toda la información que alguien necesitaría para responder tu pregunta</span>
                    <TextEditor/>
                </div>

                <div>
                    <span className='fs-3 d-block'>Etiquetas</span>
                    <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Agregue etiquetas para describir de qué se trata su pregunta</span>

                    <div className="input-group my-3 ">
                        <input type="text" className="form-control"
                            placeholder="Has una pregunta?"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            onChange={(e)=> dispatch({type: types.newQuestionFormDataTab, payload:e.target.value })}
                            />
                        </div>
                    </div>
                </div>

            <div> <button className="btn btn-primary mt-4"
                onClick={()=> createNewQuestion(questionCollectionRef,
                    {
                        question:questionFormData.title,
                        description: editorContent,
                        tecnologias:questionFormData.tab.split(" "),
                        fecha: Timestamp.now(),
                        answers:[]
                    }
                    )}
            >Publica tu pregunta </button></div>
            </div>
        </div>
        </div>
    )
}

export default AskQuestion