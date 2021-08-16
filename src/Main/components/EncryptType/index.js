import React from 'react';

function Index(props){ //selection box code
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
export default Index;