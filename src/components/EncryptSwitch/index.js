import React from 'react';
import './index.css';

function Index(props){ //switch for encryption/decryption
    return(<>
      <label class="switchbox">
      <input type="checkbox" name="toEncrypt" value={props.value} onChange={props.onChange}/>
      <span class="slider round"></span>
      </label>
      </>
    );
  }
export default Index;