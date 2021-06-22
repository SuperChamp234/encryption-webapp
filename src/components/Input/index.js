import React from 'react';


function Index(props){ //input box code
    return(
      <textarea
        name='input'
        id='input-area'
        value={props.input} 
        onChange={props.onChange} 
      />
    );
  }
export default Index;