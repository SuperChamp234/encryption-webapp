import React from 'react';
import './App.css';
import Input from './components/Input'
import Settings from './components/Settings'
import EncryptSwitch from './components/EncryptSwitch'
import EncryptType from './components/EncryptType'
import Output from './components/Output'

class App extends React.Component{
    constructor(props){
      super(props);
      this.state= {
        input: '',
        conversionType: '*/-*ceasar',
        output: '',
        settings: {
          shift: 0,
          toEncrypt: true,
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
          [event.target.name]: ![this.state.settings.toEncrypt],
        },
      });
    }
  
    render(){  //render the program
      return(<>
        <Input input={this.state.input} onChange={this.handleChange}/>
        <div className="settings">
          <EncryptSwitch onChange={this.handleChangeSettings}/>
          <EncryptType selection={this.state.conversionType} onChange={this.handleChange} />
          <Settings conversionType={this.state.conversionType} onChange={this.handleChangeSettings}/>
          {this.state.settings.toEncrypt}
        </div>
        <Output output={this.state.output}/></>
      );
    }
  }
  //---

export default App;
