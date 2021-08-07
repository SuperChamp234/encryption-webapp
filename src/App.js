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
        r1_variant: "i",
        r2_variant: "ii",
        r3_variant: "iii",
        r1_position: 1,
        r2_position: 1,
        r3_position: 1,
        r1_ring: 2,
        r2_ring: 2,
        r3_ring: 2,
      };
      this.handleChange = this.handleChange.bind(this);
    }
    updateOutput(){
      const output = chooseTransformation({
        input: this.state.input,
        settings: {
          shiftAmount: this.state.shift,
          rotorOne: {
            rotor: "one",
            pos: this.state.r1_position,
            ring: this.state.r1_ring,
            variant: this.state.r1_variant,
          },
          rotorTwo: {
            rotor: "two",
            pos: this.state.r2_position,
            ring: this.state.r2_ring,
            variant: this.state.r2_variant,
          },
          rotorThree: {
            rotor: "three",
            pos: this.state.r3_position,
            ring: this.state.r3_ring,
            variant: this.state.r3_variant,
          },
          plugPairs: "",
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
        <Input input={this.state.input} onChange={this.handleChange} />
        <div className="settings">
        
        <div className="switchclass">Encrypt <EncryptSwitch onChange={this.handleChange} value={this.state.toEncrypt}/>  Decrypt</div>
          <EncryptType selection={this.state.conversionType} onChange={this.handleChange} />
          <Settings 
            conversionType={this.state.conversionType} 
            onChange={this.handleChange} 
            shift_value={this.state.shift}
            r1_variant={this.state.r1_variant}
            r2_variant={this.state.r2_variant}
            r3_variant={this.state.r3_variant}
            r1_position={this.state.r1_position}
            r2_position={this.state.r2_position}
            r3_position={this.state.r3_position}
            r1_ring={this.state.r1_ring}
            r2_ring={this.state.r2_ring}
            r3_ring={this.state.r3_ring}
            />
        </div>
        <Output output={this.updateOutput()} />
        </>
      );
    }
  }

export default App;
