import React from 'react';
import { CompactPicker } from 'react-color';

class EditTag extends React.Component {
    constructor(props) {
      super(props);

      this.state={
        type: this.props.tagObj.type, 
        styles: this.props.tagObj.styles,
        body: this.props.tagObj.body,
        parentStyles: this.props.tagObj.parentStyles
      }
      this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(event, type){
      this.setState({[type]: event.target.value})
      this.props.updateTag(event, this.props.index, type)
    }

    render() {
      let TE = '<Text Editor/>'
      if (this.state.type === 'img') {
        return (
         <div id='edit-tag-top'> 
          <div id='edit-tag-form'>
            Width: <input
              type="range"
              min="100"
              max="800"
              id="img-width-slider"
              onChange={this.props.handleImgWidthChange}
            />

            Height: <input
              type="range"
              min="100"
              max="800"
              id="img-height-slider"
              onChange={this.props.handleImgHeightChange}
            />
          </div>
          <button id='delete-button' onClick={() => this.props.deleteTag(this.props.index)}>DELETE</button>
        </div>
      ) 
      } else {
        return (
          <div id='edit-tag-form'>
              <h1 id='edit-tag-h1'>{TE}</h1>
              <div id='color-picker' className="edit-tag-input">
                <CompactPicker id='compact-picker'
                  color={this.state.styles.filter(ele => ele[0] === "color")[0][1]}
                  onChange={this.props.handleChange}
                />
              </div>
              {/* <div className='edit-tag-input' id='text-align-dropdown'>
              <p>textAlign=</p>  <select name="text-align" >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div> */}
              {/* <div className='edit-tag-input'>
              <p>body=</p> <input
                  type="textarea"
                  id='tag-textarea'
                  placeholder='Add Your Text Here'
                  value={this.state.body}
                  onChange={(e) => this.handleUpdate(e, "body")}
                />
              </div> */}
              <div  className='edit-tag-input'>
                <div id='huh' action="">
                <p>font=</p> <select name="fonts" id="font-dropdown" onChange={this.props.handleFontChange}>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="sans-serif">Sans-serif</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Arial">Arial</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Arial Black">Arial Black</option>
                    {/* <option value="Gadget">Gadget</option> */}
                    <option value="Comic Sans MS">Comic Sans MS</option>
                    <option value="cursive">Cursive</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Geneva">Geneva</option>
                    <option value="Courier">Courier</option>
                    <option value="monospace">monospace</option>
                  </select>
                </div>
              </div>
            <div  className='edit-tag-input'>
              <p>fontSize=</p><select
                className="slider"
                name="slider"
                id="font-size-dropdown"
                onChange={this.props.handleFontSizeChange}
              >
                <option value="8px">8px</option>
                <option value="12px">12px</option>
                <option value="16px">16px</option>
                <option value="18px">18px</option>
                <option value="24px">24px</option>
                <option value="32px">32px</option>
                <option value="48px">48px</option>
                <option value="72px">72px</option>
              </select>

            </div>
            <button id='delete-button' onClick={() => this.props.deleteTag(this.props.index)}>DELETE</button>
            <button id='exit-button' onClick={this.props.exitEdit}>X</button>
          </div>
        );
      }
  }
}

export default EditTag;