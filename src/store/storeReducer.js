
const types = {
    setUser: "set user",
    getAllQuestions: "question/get all",
    getSingleQuestion: "question/get single",
    getCurrentQuestionAnswers:"get current/ question / answers",
    getEditorContent: "editor/ get content",
    newQuestionFormDataTitle:"question/ form data/ title",
    newQuestionFormDataTab:"question/ form data/ tab",
    newQuestionFormDataError:"question/ form data/ error",
    setFilteredQuestion:"question/ set filterd question",
    registerFormDataEmail:"register/form data/ email",
    registerFormDataPassword:"register/form data/ password",
    loginFormDataEmail:"login/form data/ email",
    loginFormDataPassword:"login/form data/ password",
    handleMobileMenu: "menu/ open or close"

}

const inicialStore = {
    user: null,
    questions: null,
    currentQuestionAnswers:[],
    singleQuestion: null,
    editorContent: "",
    questionFormData:{title:"", tab:"", formError:""},
    filteredQuestion:[],
    registerFormDate:{registerEmail: "", registerPassword: ""},
    loginFormDate:{loginEmail: "", loginPassword: ""},
    isMobileMenuOpen: false,
  
    

}

const storeReducer = (state, action) => {

    switch (action.type) {
        case types.setUser:
            return{
                ...state,
                user: action.payload
            }
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
            case types.getCurrentQuestionAnswers:
            return{
                ...state,
                currentQuestionAnswers: action.payload
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
            case types.newQuestionFormDataError:
            return{
                ...state,
                questionFormData:{...state.questionFormData, formError: action.payload}
            }
            case types.setFilteredQuestion:
            return{
                ...state,
                filteredQuestion: action.payload
            }
            case types.registerFormDataEmail:
                return{
                    ...state,
                    registerFormDate:{...state.registerFormDate,registerEmail: action.payload}
                }
                case types.registerFormDataPassword:
                return{
                    ...state,
                    registerFormDate:{...state.registerFormDate,registerPassword: action.payload}
                }
                case types.loginFormDataEmail:
                    return{
                        ...state,
                        loginFormDate:{...state.loginFormDate,loginEmail: action.payload}
                    }
                    case types.loginFormDataPassword:
                    return{
                        ...state,
                        loginFormDate:{...state.loginFormDate, loginPassword: action.payload}
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

