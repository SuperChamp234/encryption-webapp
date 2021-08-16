import React from 'react';
import './index.css';

function Index(props){ //switch for encryption/decryption
  if (props.conversionType == "*/-*ceasar"){
    return(<>Encrypt
      <label class="switchbox">
      <input type="checkbox" name="toEncrypt" value={props.value} onChange={props.onChange}/>
      <span class="slider round"></span>
      </label>Decrypt
      </>
    );
  }
  else {
    return(null);
  }
}
export default Index;