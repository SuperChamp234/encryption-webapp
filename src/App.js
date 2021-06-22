import React from 'react';
import './App.css';
import { chooseTransformation } from './EncryptionProgram';
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
        output: '',
        conversionType: '*/-*ceasar',
        shift: 0,
        toEncrypt: true,
      };
      this.handleChange = this.handleChange.bind(this);
    }
    updateOutput(){
      const output = chooseTransformation({
        input: this.state.input,
        settings: {
          shiftAmount: this.state.shift
        },
        type: this.state.conversionType,
        toEncrypt: this.state.toEncrypt,
      });
      return output;
    }
    handleChange(event){
      this.setState({
        [event.target.name]: event.target.value,
      });
    }  
    render(){  //render the program
      return(<>
        <Input input={this.state.input} onChange={this.handleChange}/>
        <div className="settings">
          <EncryptSwitch onChange={this.handleChange} value={this.state.toEncrypt}/>
          <EncryptType selection={this.state.conversionType} onChange={this.handleChange} />
          <Settings conversionType={this.state.conversionType} onChange={this.handleChange} shift_value={this.state.shift}/>
        </div>
        <Output output={this.updateOutput()}/> </>
      );
    }
  }

export default App;
