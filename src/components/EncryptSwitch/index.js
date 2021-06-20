import React from 'react';

function Index(props){ //switch for encryption/decryption
    return(
    <label className="switch">
    <input type="checkbox" name="toEncrypt" onChange={props.onChange}/>
    <span className="slider round"></span>
    </label>
    );
  }
export default Index;