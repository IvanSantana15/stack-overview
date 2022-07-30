
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useStore } from "../store/StoreProvider";
import { types } from "../store/storeReducer";

const TextEditor = () => {
    const [,dispatch] = useStore()

    return (
    <>
        <div className="border w-100 ">
            <Editor
                defaultEditorState={EditorState.createEmpty()}
                toolbarClassName="toolbarClassName"
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor pb-5"
                onEditorStateChange={editorState => {
                    dispatch({type: types.getEditorContent, 
                            payload:draftToHtml(convertToRaw(editorState.getCurrentContent()))})
                }}
            />

        </div>

        
        </>
    )
}

export default TextEditor