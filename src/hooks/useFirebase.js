import { db } from '../firebase'
import {collection, getDocs, doc, getDoc, updateDoc, addDoc}from "firebase/firestore"
import { types } from '../store/storeReducer'
import { useStore } from '../store/StoreProvider'
import {  useNavigate } from 'react-router-dom'

const useFirebase = () => {
    const [, dispatch] = useStore()
   const navigate = useNavigate()

    const getQuestions = async()=>{
        const questionsCollectionRef = collection(db,"questions") 
        const data = await getDocs(questionsCollectionRef)
        const questions = data.docs.map((doc)=> ({...doc.data(),id: doc.id}))
        dispatch({type: types.getAllQuestions,payload: questions})
        
    }

    const getSingleDoc = async (docId) => {
        const docRef = doc(db, 'questions', docId)
        const data = await getDoc(docRef)
  
        dispatch({type: types.getSingleQuestion, payload: data.data()})
  
        return data
      }

      const updateCurrrentDoc = async({collection='questions', docId, data})=>{
        const questionRef = doc(db, collection, docId)
       await updateDoc(questionRef, data)
       
      }

      const createNewQuestion = async (collectionRef,data) => {
       
        const res = await addDoc(collectionRef, data)

        if(res){
          navigate("/")
        }
    }

  return ({
    getQuestions,
    getSingleDoc,
    updateCurrrentDoc,
    createNewQuestion 
  })
}

export default useFirebase