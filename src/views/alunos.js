import React, {Component} from 'react';
import axios from 'axios';

class Alunos extends Component {
  constructor(props){
    super();
    this.state = {
      lista : []
    }
  }

  componentWillMount(){
    axios.get('http://localhost:8000/alunos').then((response) => console.log(response.data[0].nome));
  }

  getList = () =>{
    return ["Alex", "José", "Maria"]
  }
  render() { 
    return ( 
      <div>
        <ul>
         
        </ul>
      </div>
    );
  }
}
 
export default Alunos;