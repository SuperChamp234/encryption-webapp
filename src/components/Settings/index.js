import React from 'react';
import './index.css';

function Index(props){ //settings for encryption
    if(props.conversionType === "*/-*ceasar"){
      return(
        <div>
          <label>Shift by:</label>
          <input type="number" id="shift" value={props.shift_value} name="shift" min="0" onChange={props.onChange}></input>
        </div>
      );
    }
    else if(props.conversionType === "*/-*enigma"){
    return(
      <div class = "EnigmaSettings"> 
        <div class="SettingsCell">
          <div class="CellHeading">Rotor 1</div>
            <div>
              <select name='r1_variant' value={props.r1_variant} onChange={props.onChange}>
                <option value='i'>I</option>
                <option value='ii'>II</option>
                <option value='iii'>III</option>
              </select>
            </div>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Position</div><input type="number" name="r1_position" class="en_position" value={props.r1_position} min="0" max="26" onChange={props.onChange}></input>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Ring</div><input type="number" name="r1_ring" value={props.r1_ring} min="0" max="26" onChange={props.onChange}></input>
        </div>
        {/* Cell Settings 2 */}
        <div class="SettingsCell">
          <div class="CellHeading">Rotor 2</div>
            <div>
              <select name='r2_variant' value={props.r2_variant} onChange={props.onChange}>
                <option value='i'>I</option>
                <option value='ii'>II</option>
                <option value='iii'>III</option>
              </select>
            </div>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Position</div><input type="number" name="r2_position" class="en_position" value={props.r2_position} min="0" max="26" onChange={props.onChange}></input>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Ring</div><input type="number" name="r2_ring" value={props.r2_ring} min="0" max="26" onChange={props.onChange}></input>
        </div>
        
        <div class="SettingsCell">
          <div class="CellHeading">Rotor 3</div>
            <div>
              <select name='r3_variant' value={props.r3_variant} onChange={props.onChange}>
                <option value='i'>I</option>
                <option value='ii'>II</option>
                <option value='iii'>III</option>
              </select>
            </div>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Position</div><input type="number" name="r3_position" class="en_position" value={props.r3_position} min="0" max="26" onChange={props.onChange}></input>
        </div>
        <div class="SettingsCell">
          <div class="CellHeading">Ring</div><input type="number" name="r3_ring" value={props.r3_ring} min="0" max="26" onChange={props.onChange}></input>
        </div>
      </div>
      
    );
    }
  }

export default Index;