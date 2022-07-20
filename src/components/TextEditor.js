
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js"
import draftToHtml from "draftjs-to-html"
import { useState } from "react";

const TextEditor = ({getEditorContent,btnTextContext}) => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    return (
    <>
        <div className="border w-100 ">
            <Editor
                defaultEditorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor pb-5"
                onEditorStateChange={editorState => {
                    setEditorState(editorState);
                    getEditorContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))

                    console.log(draftToHtml( convertToRaw(editorState.getCurrentContent())))
                }}
            />

        </div>

        
        </>
    )
}

export default TextEditor