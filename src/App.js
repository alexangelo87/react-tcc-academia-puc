import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Alunos from './views/alunos';

function App() {
  return (
    <Router>
    <div>
      <div>            
        <div>
          <Route  path = "/" exact component = {Alunos}/>               
          <Route  path = "/alunos" component = {Alunos}/>               
        </div>
      </div>        
    </div>        
  </Router> 
  );
}

export default App;
