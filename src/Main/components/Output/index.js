import React from 'react';
function Index(props){ //output area 
    return(
      <textarea
        name='output'
        id='output-area'
        value={props.output}
        onChange={null}
      />
    );
  }
export default Index;