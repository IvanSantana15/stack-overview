import { db } from '../firebase'
import { collection, getDocs, doc, getDoc, addDoc, query, where, updateDoc, arrayUnion } from "firebase/firestore"
import { types } from '../store/storeReducer'
import { useStore } from '../store/StoreProvider'
import { useNavigate } from 'react-router-dom'

const useFirebase = () => {
  const [, dispatch] = useStore()
  const navigate = useNavigate()

  const getQuestions = async () => {
    const questionsCollectionRef = collection(db, "questions")
    const data = await getDocs(questionsCollectionRef)

    const questions = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    dispatch({ type: types.getAllQuestions, payload: questions })

  }

  const getAnswers = async (questionId) => {

    const answersCollectionRef = collection(db, "Answers")
    const q = query(answersCollectionRef, where("PreguntaId", "==", questionId))
    const answers = await getDocs(q)
    dispatch({ type: types.getCurrentQuestionAnswers, payload: answers.docs.map(answer => answer.data()) })

  }

  const getAnswersCount = async (questionId) => {
    let answersCount;

    const answersCollectionRef = collection(db, "Answers")
    const q = query(answersCollectionRef, where("PreguntaId", "==", questionId))
    const answers = await getDocs(q)
    answersCount = answers.docs.map(answer => answer.data())

    return answersCount.length
  }

  const getSingleDoc = async (docId) => {
    const docRef = doc(db, 'questions', docId)
    const data = await getDoc(docRef)
    const question = { ...data.data(), Id: data.id }

    dispatch({ type: types.getSingleQuestion, payload: question })

    return data
  }

  const newAnswer = async ({docId,text}) => {

    const docRef = doc(db, 'questions', docId)
    const res = await updateDoc(docRef, {Respuestas: arrayUnion(text)})
   return res
      
  }


  const createNewQuestion = async (collectionRef, data) => {

    const res = await addDoc(collectionRef, data)
    if (res) {
      navigate("/")
    }
  }

  return ({
    getQuestions,
    getAnswers,
    getAnswersCount ,
    getSingleDoc,
    newAnswer,
    createNewQuestion
  })
}

export default useFirebase