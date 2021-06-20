import React from 'react';

function Index(props){ //settings for encryption
    if(props.conversionType === "*/-*ceasar"){
      return(
        <div>
          <label>Shift by:</label>
          <input type="number" id="shift" name="shift" min="0" onChange={props.onChange}></input>
        </div>
      );
    }
    else if(props.conversionType === "*/-*enigma"){
    return(<div id="settings">Enigma settings</div>);
    }
  }
export default Index;