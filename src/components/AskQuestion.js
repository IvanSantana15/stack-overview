import { addDoc, collection, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../firebase'
import TextEditor from './TextEditor'

const AskQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState("")
    const [textEditorContent, setTextEditorContent] = useState("")
    const [etiquetas, setEtiquetas] = useState("")
    const questionCollectionRef = collection(db, "questions")

    const createNewQuestion = async () => {

        const res = await addDoc(questionCollectionRef, {
            question: questionTitle,
            description: textEditorContent,
            tecnologias: etiquetas.split(" "),
            fecha: Timestamp.now(),
            answers: []
        })

        console.log(res)
    }


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
                            onChange={(e) => setQuestionTitle(e.target.value)}
                        />

                    </div>

                    <div className=''>
                        <span className='fs-3'>Cuerpo</span>
                        <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Incluye toda la información que alguien necesitaría para responder tu pregunta</span>
                        <TextEditor getEditorContent={setTextEditorContent} />
                    </div>

                    <div>
                        <span className='fs-3 d-block'>Etiquetas</span>
                        <span style={{ "fontSize": "14px" }} className=' mb-3 d-block'>Incluye toda la información que alguien necesitaría para responder tu pregunta</span>

                        <div className="input-group my-3 ">
                            <input type="text" className="form-control"
                                placeholder="Etiquetas"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                onChange={(e) => setEtiquetas(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='mx-2'>
                    <button className="btn btn-primary mt-4"
                        onClick={() => createNewQuestion()}
                    >Publica tu pregunta </button></div>
                </div>
            </div>
        </div>
    )
}

export default AskQuestion