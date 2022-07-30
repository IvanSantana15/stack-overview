import { db } from '../firebase'
import {collection, getDocs, doc, getDoc, arrayUnion, updateDoc, addDoc}from "firebase/firestore"
import { types } from '../store/storeReducer'
import { useStore } from '../store/StoreProvider'

const useFirebase = () => {
    const [store, dispatch] = useStore()

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
  
        
      }

      const updateCurrrentDoc = async({collection='questions', docId, data})=>{
        const questionRef = doc(db, collection, docId)
       const res =  await updateDoc(questionRef, data)
       console.log(res)
      }

      const createNewQuestion = async (collectionRef,data) => {
       
        const res = await addDoc(collectionRef, data)

       console.log(res)
    }

  return ({
    getQuestions,
    getSingleDoc,
    updateCurrrentDoc,
    createNewQuestion 
  })
}

export default useFirebase