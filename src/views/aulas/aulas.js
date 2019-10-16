import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    IconButton,
    CircularProgress,
    Button,
    Divider
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Aulas() {
    const [aulas, setAulas] = useState([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/aulas`).then((response) =>{ 
          setAulas(response.data);
          setVisible(false);
        }).catch(error => console.log(`error: ${error}`));
    },[]);

    function deleteInstrutor(id) {
        if(window.confirm("Deseja realmente deletar esta aula?")) {
          axios.delete(`http://localhost:8000/aulas/${id}`)
            .then(() => {
              axios.get('http://localhost:8000/aulas').then((response) =>{ 
                setAulas(response.data);
              });
            })
            .catch((error)=> {
              console.log({erro: "Erro ao excluir aluno", detail : error.response.data})
              window.alert("Erro ao excluir o aluno!")
            });
        }
    }

    function openDetail(id) {
        window.location.href =`/aula/${id}`;
    }
    
    return (
        <div>
            <Grid container justify = "center" xs={8} >
                {visible && <CircularProgress />}
            </Grid>

            <Grid item xs={8}>
                 <div>
                    <h2>Aulas</h2>
                    <Button color="primary"> + nova aula</Button>
                    <Divider/>
                </div>
                <List component="nav" aria-label="aulas">
                    { aulas.map((aula, index) => 
                        <ListItem key= {index} button>
                            <Grid item xs={9}>
                                <ListItemText  primary={aula.nome} onClick = {()=> openDetail(aula._id)}/>
                            </Grid>
                            <Grid item xs= {3}>
                            <IconButton aria-label="delete" onClick = {()=> deleteInstrutor(aula._id)}>
                                <DeleteIcon />
                            </IconButton>
                            </Grid>
                        </ListItem>) }
                </List>
            </Grid>
        </div>
    );
}