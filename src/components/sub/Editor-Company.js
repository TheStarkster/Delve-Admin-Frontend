import React, { Component } from "react";
import JoditEditor from "jodit-react";

class Editor extends Component {
  state = {
    content: "",
  };
  returnContent = () => {
    return this.state.content
  }
  render() {
    const config = {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
    };
    return (
      <JoditEditor
        value={this.content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => this.setState({ content: newContent })} // preferred to use only this option to update the content for performance reasons
        onChange={(newContent) => {}}
      />
    );
  }
}
export default Editor;
