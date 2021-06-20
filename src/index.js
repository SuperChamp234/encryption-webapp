import React from 'react';
import ReactDOM from 'react-dom';

class Program extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      input: '',
      conversionType: '*/-*ceasar',
      output: '',
      settings: {
        shift: 0
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSettings = this.handleChangeSettings.bind(this);
  }
  handleChange(event){ 
    var output = (event.target.value === "*/-*enigma" || event.target.value === "*/-*ceasar")? this.state.output : event.target.value  //updates the state of react components when anything is changed
    this.setState({
      [event.target.name]: event.target.value,
      output: output,
    });
  }
  handleChangeSettings(event){
    this.setState({
      settings: {
        [event.target.name]: event.target.value,
      },
    });
  }

  render(){  //render the program
    return(<>
      <Input input={this.state.input} onChange={this.handleChange}/>
      <div class="settings">
        <EncryptType selection={this.state.conversionType} onChange={this.handleChange} />
        <Settings conversionType={this.state.conversionType} onChange={this.handleChangeSettings}/>
      </div>
      <Output output={this.state.output}/></>
    );
  }
}
//---
function Input(props){ //input box code
  return(
    <textarea
      name='input'
      id='input-area'
      value={props.input} 
      onChange={props.onChange} 
    />
  );
}
function EncryptType(props){ //selection box code
  return(
    <label id='conversion-selection'>
      Select Encryption Type:
      <select name='conversionType' value={props.selection} onChange={props.onChange}>
        <option value='*/-*ceasar'>Caesar Cipher</option>
        <option value='*/-*enigma'>Enigma</option>
      </select>
    </label>
  );
}
function Output(props){
  return(
    <textarea
      name='output'
      id='output-area'
      value={props.output}
      onChange={null}
    />
  );
}
function Settings(props){
  if(props.conversionType === "*/-*ceasar"){
    return(
      <div>
        <label for="ceasar-shift">Shift by:</label>
        <input type="number" id="shift" name="shift" min="0" onChange={props.onChange}></input>
      </div>
    );
  }
  else if(props.conversionType === "*/-*enigma"){
  return(<div id="settings">Enigma settings</div>);
  }
}
ReactDOM.render(
  <Program />,
  document.getElementById('root')
);

