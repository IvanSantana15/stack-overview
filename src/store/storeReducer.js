
const types = {
    getAllQuestions: "question/get all",
    getSingleQuestion: "question/get single",
    getEditorContent: "editor/ get content",
    newQuestionFormDataTitle:"question/ form data/ title",
    newQuestionFormDataTab:"question/ form data/ tab",
    setFilteredQuestion:"question/ set filterd question",
    handleMobileMenu: "menu/ open or close"

}

const inicialStore = {
    questions: null,
    singleQuestion: null,
    editorContent: "",
    questionFormData:{title:"", tab:""},
    filteredQuestion:[],
    isMobileMenuOpen: false
    

}

const storeReducer = (state, action) => {

    switch (action.type) {
        case types.getAllQuestions:
            return{
                ...state,
                questions: action.payload
            }
        case types.getSingleQuestion:
            return{
                ...state,
                singleQuestion: action.payload
            }
        case types.getEditorContent:
            return{
                ...state,
                editorContent: action.payload
            }
            case types.newQuestionFormDataTitle:
            return{
                ...state,
                questionFormData:{...state.questionFormData, title: action.payload}
            }
            case types.newQuestionFormDataTab:
            return{
                ...state,
                questionFormData:{...state.questionFormData, tab: action.payload}
            }
            case types.setFilteredQuestion:
            return{
                ...state,
                filteredQuestion: action.payload
            }
            case types.handleMobileMenu:
                return{
                    ...state,
                   isMobileMenuOpen: action.payload
                }
        default:
            return state
            
    }
  
}

export {types}
export {inicialStore}

export default storeReducer

