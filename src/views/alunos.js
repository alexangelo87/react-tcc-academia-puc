import React, {Component} from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Alunos extends Component {
  constructor(props){
    super();
    this.state = {
      alunos : []
    }
  }

  componentWillMount(){
    axios.get('http://localhost:8000/alunos').then((response) =>{ 
      this.setState({alunos : response.data});
      console.log(this.state.alunos)
    });
  }
  getList = () =>{
  }
  render() { 
    return ( 
      <div>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItemLink href="#simple-list">
          {this.state.alunos.map((aluno, index)=><ListItemText key= {index} primary= {aluno.nome} />)}
          </ListItemLink>
        </List>
      </div>
    );
  }
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
 
export default Alunos;