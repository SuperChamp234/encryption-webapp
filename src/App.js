import React from 'react';
import Program from './Main/index.js';
import './App.css';

class App extends React.Component{
  render(){//render everything
    return(<>
      <div className="programtitle"><AppHeading /></div>
      <div className="programbody"><Program /></div>
    </>
    );
  }
  
}
function AppHeading(props){
  return(<>
    <div className="maintitle">Poggers Encryption!</div>
    <div className="subtitle">Simply Encrypt 😉</div>
  </>);
}
export default App;