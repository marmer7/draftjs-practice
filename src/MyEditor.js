import React from "react";

import {
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  Modifier
} from "draft-js";

export default class MyEditor extends React.Component {
  state = { editorState: EditorState.createEmpty() };

  onChange = editorState => this.setState({ editorState });

  handleKeyCommand = command => {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );

    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  addText = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const txt = "Add this text to journal!";
    let nextEditorState = EditorState.createEmpty();
    if (selection.isCollapsed()) {
      const nextContentState = Modifier.insertText(
        contentState,
        selection,
        txt
      );
      nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "insert-characters"
      );
    } else {
      const nextContentState = Modifier.replaceText(
        contentState,
        selection,
        txt
      );
      nextEditorState = EditorState.push(
        editorState,
        nextContentState,
        "insert-characters"
      );
    }
    this.onChange(nextEditorState);
  };

  render() {
    return (
      <div id="content">
        <button onClick={this.addText}>addText</button>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
          />
        </div>
      </div>
    );
  }
}

// addText = () => {
//   const contentState = this.state.editorState.getCurrentContent();
//   const selectionState = this.state.editorState.getSelection();
//   const end = selectionState.getEndOffset();
//   const nextContentState = Modifier.insertText(
//     contentState,
//     end,
//     "my first task"
//   );
//   this.setState({
//     editorState: EditorState.push(
//       this.state.editorState,
//       nextContentState,
//       "insert-characters"
//     )
//   });
// };
