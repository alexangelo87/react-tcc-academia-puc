import React, {Component} from 'react';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
      console.log(this.state.alunos[6].user.nome)
    });
  }
  getList = () =>{
  }
  render() { 
    return ( 
      <div>
        <Grid item xs={8}>
          <List component="nav" aria-label="secondary mailbox folders">
            <ListItemLink href="#simple-list">
            {
              this.state.alunos.map((aluno, index)=><ListItemText key= {index} primary={aluno.nome} />)
            }
            </ListItemLink>
          </List>
          <Divider />
        </Grid>       
      </div>
    );
  }
}

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
 
export default Alunos;