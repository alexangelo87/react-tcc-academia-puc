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
    
    return (
        <div>
            <Grid container justify = "center" xs={8} >
                {visible && <CircularProgress />}
            </Grid>

            <Grid item xs={8}>
                <List component="nav" aria-label="instrutores">
                    { instrutores.map((instrutor, index) => 
                        <ListItem key= {index} button>
                            <ListItemText  primary={instrutor.nome} />
                        </ListItem>) }
                </List>
            </Grid>
        </div>
    );
}
