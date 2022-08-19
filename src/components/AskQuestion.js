import { collection, Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import useFirebase from '../hooks/useFirebase'
import { useStore } from '../store/StoreProvider'
import { types } from '../store/storeReducer'
import TextEditor from './TextEditor'

const AskQuestion = () => {
    const [store, dispatch] = useStore()
    const { questionFormData, editorContent } = store
    const { createNewQuestion } = useFirebase()
    const { user } = store
    const navigate = useNavigate()
    const questionCollectionRef = collection(db, "questions")


    const handleSubmit = (e) => {
        e.preventDefault()
        if (!user) return navigate("/iniciar-sesion")

        if (questionFormData.title === "" || questionFormData.tab === "") {
            dispatch({ type: types.newQuestionFormDataError, payload: "Todos los campos son requeridos" })
            return
        }

        createNewQuestion(questionCollectionRef,
            {
                Pregunta: questionFormData.title,
                Descripcion: editorContent,
                Tecnologias: questionFormData.tab.split(" "),
                Fecha: Timestamp.now(),
                Respuestas: []
            }
        )
    }


    return (
        <div className='Container mt-3 '>

            <div className='row'>

                <form className='col-md-9 col-lg-9' onSubmit={(e) => handleSubmit(e)}>

                    <h2 className='mx-2'>Formular una pregunta</h2>
                    <span className='p-2 text-danger'>{questionFormData.formError}</span>
                    <div className=' border p-3 mt-4'>

                        <div className='d-block'>
                            <span className='fs-3'>Titulo</span>
                        </div>
                        <div className="input-group mb-3">

                            <input type="text" className="form-control"
                                placeholder="Has una pregunta"
                                onChange={(e) => dispatch({ type: types.newQuestionFormDataTitle, payload: e.target.value })}
                            />

                        </div>

                        <div className=''>
                            <span className='fs-3'>Cuerpo</span>
                            <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Incluye toda la información que alguien necesitaría para responder tu pregunta</span>
                            <TextEditor />
                        </div>

                        <div>
                            <span className='fs-3 d-block'>Etiquetas</span>
                            <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Agregue etiquetas para describir de qué se trata su pregunta</span>

                            <div className="input-group my-3 ">
                                <input type="text" className="form-control"
                                    placeholder="Has una pregunta"
                                    aria-describedby="basic-addon1"
                                    onChange={(e) => dispatch({ type: types.newQuestionFormDataTab, payload: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='p-2'>
                        <button className="btn btn-primary mt-4"
                            type='submit'
                        >Publica tu pregunta </button></div>
                </form>

            </div>
        </div>
    )
}

export default AskQuestion