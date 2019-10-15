import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
  CircularProgress,
  Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from '../../styles/styles';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/alunos').then((response) =>{ 
      setAlunos(response.data);
      setVisible(false);
    });
  },[]);

  function deleteAluno(id) {
    if(window.confirm("Deseja realmente deletar este aluno?")) {
      axios.delete(`http://localhost:8000/alunos/${id}`)
        .then(() => {
          axios.get('http://localhost:8000/alunos').then((response) =>{ 
            setAlunos(response.data);
          });
        })
        .catch((error)=> {
          console.log({erro: "Erro ao excluir aluno", detail : error.response.data})
          window.alert("Erro ao excluir o aluno!")
        });
    }
  }

  function openDetail(id) {
    window.location.href =`/aluno/${id}`;
  }

  return ( 
    <div>
      <Grid container justify = "center" xs={8} >
        {visible && <CircularProgress />}
      </Grid>
      
      <Grid item xs={8}>
        <div>
          <h2>Alunos</h2>
          <Divider/>
        </div>
        <List component="nav" aria-label="secondary mailbox folders">         
          {
            alunos.map((aluno, index)=>
                <ListItem key= {index} button style= {useStyles.separador}>
                  <Grid container direction="row">
                    <Grid item xs={9}>
                      <ListItemText  primary={aluno.user.nome} onClick = {()=> openDetail(aluno._id)}/>
                    </Grid>
                    <Grid item xs={3}>
                    <IconButton aria-label="delete" onClick = {()=> deleteAluno(aluno._id)}>
                      <DeleteIcon />
                    </IconButton>
                    </Grid>
                  </Grid>
                </ListItem>                 
            )
          }
        </List>
      </Grid>       
    </div>
  );
}