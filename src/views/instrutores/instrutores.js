import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    IconButton,
    CircularProgress
  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Instrutores() {
    const [instrutores, setInstrutores] = useState([]);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/instrutores`).then((response) =>{ 
          setInstrutores(response.data);
          setVisible(false);
        }).catch(error => console.log(`error: ${error}`));
    },[]);

    function deleteInstrutor(id) {
        if(window.confirm("Deseja realmente deletar este instrutor?")) {
          axios.delete(`http://localhost:8000/instrutores/${id}`)
            .then(() => {
              axios.get('http://localhost:8000/instrutores').then((response) =>{ 
                setInstrutores(response.data);
              });
            })
            .catch((error)=> {
              console.log({erro: "Erro ao excluir aluno", detail : error.response.data})
              window.alert("Erro ao excluir o aluno!")
            });
        }
    }

    function openDetail(id) {
        window.location.href =`/instrutor/${id}`;
    }
    
    return (
        <div>
            <Grid container justify = "center" xs={8} >
                {visible && <CircularProgress />}
            </Grid>

            <Grid item xs={8}>
                <List component="nav" aria-label="instrutores">
                    { instrutores.map((instrutor, index) => 
                        <ListItem key= {index} button>
                            <Grid item xs={9}>
                                <ListItemText  primary={instrutor.nome} onClick = {()=> openDetail(instrutor._id)}/>
                            </Grid>
                            <Grid item xs= {3}>
                            <IconButton aria-label="delete" onClick = {()=> deleteInstrutor(instrutor._id)}>
                                <DeleteIcon />
                            </IconButton>
                            </Grid>
                        </ListItem>) }
                </List>
            </Grid>
        </div>
    );
}
