import React from 'react';
import EditTag from "./edit_tag_container"

class ParseHTML extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        tagObj: this.props.tagObj,
        editing: false
      };
      this.handleColorChange = this.handleColorChange.bind(this);
      this.toggleEdit = this.toggleEdit.bind(this);
      this.handleFontChange = this.handleFontChange.bind(this);
      this.handleFontSizeChange = this.handleFontSizeChange.bind(this);
    }

    // componentDidMount(){
    //   const tag = document.getElementById(`${this.props.index}`)
    //   tag.addEventListener("click", (event) => {
    //     if(event.currentTarget.id != this.props.index){
    //       this.setState({editing: false})
    //     }
    //   })
    // }
    
    dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "element")) {
        // if present, the element is where you move the DIV from:
        document.getElementById(elmnt.id + "element").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }
    
  componentDidUpdate(){
    if(this.state.editing && this.props.editing != this.props.index){
      this.setState({editing: false})
    }
  }

  parseStyles = () => {
    let styles = {};
    this.state.tagObj.styles.forEach(ele => styles[ele[0]] = ele[1]);
    return styles;
  }

  parseParentStyles = () => {
    if (this.state.tagObj.parentStyles) {
    let parentStyles = {};
    this.state.tagObj.parentStyles.forEach(ele => parentStyles[ele[0]] = ele[1]);
    return parentStyles;}
    else {
      return {}
    }
  }
  
  toggleEdit() {
    this.setState({ editing: !this.state.editing })
    let div = document.getElementById(`${this.props.index}`)
    this.dragElement(div)
    this.props.editingTag(this.props.index)
  }
  
  renderTag = () => {
    let styles;
    switch (this.state.tagObj.type) {
      case "p":
        styles = this.parseStyles()
        let tagId = this.props.index + 'element'
        return <p  id={tagId} style={styles}>{this.state.tagObj.body ? this.state.tagObj.body : "Click Here to Change text"}</p>
      case "img":
        styles = this.parseStyles()
        return <img src={this.state.tagObj.imgURL} style={styles}/>  
      default:
        return null
    }
  }
  
  handleColorChange = (color) => {
    let newColor = this.state.tagObj.styles
    for (let i = 0; i < newColor.length; i++) {
      if (newColor[i][0] === "color") {
        newColor[i][1] = color.hex;
      }
    }
    this.setState({ [this.state.tagObj.styles]: newColor });
  };

  handleFontChange = e => {
    let newFont = this.state.tagObj.styles
    for (let i = 0; i < newFont.length; i++) {
      if (newFont[i][0] === "fontFamily") {
        newFont[i][1] = e.target.value;
      }
    }

    this.setState({ [this.state.tagObj.styles]: newFont });
  }

  handleFontSizeChange = e => {
    
    let newFontSize = this.state.tagObj.styles
    for (let i = 0; i < newFontSize.length; i++) {
      if (newFontSize[i][0] === "fontSize") {
        newFontSize[i][1] = e.target.value;
      }
    }  
    this.setState({ [this.state.tagObj.styles]: newFontSize });
    return newFontSize
  }
  
  render() {
    let parentStyling = this.parseParentStyles();
    let editTag;
    if(this.state.editing){
      editTag = <EditTag 
        tagObj={this.state.tagObj} 
        updateTagBody={this.props.updateTagBody}
        index={this.props.index}
        handleChange={this.handleColorChange}
        handleFontChange={this.handleFontChange}
        handleFontSizeChange={this.handleFontSizeChange}
        deleteTag={this.props.deleteTag}
      />
    }else{
      editTag = ""
    }
    return (
      <div id={this.props.index} onClick={this.toggleEdit} style={parentStyling}>
          {this.renderTag()}
        <div onClick={e => e.stopPropagation()}>
          {editTag}
        </div>
      </div>
    )
  } 
}

export default ParseHTML;