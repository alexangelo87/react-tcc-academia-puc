import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { 
    Grid, 
    InputLabel, 
    makeStyles, 
    Input,
    Button,
    FormControl,
    TextField
 } from '@material-ui/core';
 import { createMuiTheme } from '@material-ui/core/styles';
 import { blue } from '@material-ui/core/colors';
 import { ThemeProvider } from '@material-ui/styles';


 const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

export default function AlunosDetail({ match }) {

    const [detalhes, setDetalhes] = useState({
      _id: "",
      identidade: "",
      cpf: "",
      endereco: "",
      user: {
        _id: "",
        nome: ""
      }
    });
    let [somenteLeitura, setSomenteLeitura] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:8000/alunos/${match.params.id}`).then((response) => {
            setDetalhes(response.data);
        }).catch((error) => console.log(error));
    });

    let handleReadOnly = () =>{
        if(somenteLeitura) {
            setSomenteLeitura(false);
        } else {
            setSomenteLeitura(true);
        }
        console.log(somenteLeitura);
    }

    let putRequest = () => {
        axios.put('http://localhost:8000/alunos', detalhes)
        .then((response) => {
            console.log(response);
        });
    }
    return (
        <div>
            <form onSubmit = {putRequest}>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-read-only-input"
                            label="Nome"
                            margin="normal"
                            value = {detalhes.user.nome}
                            InputProps={{
                            readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-read-only-input"
                            label="CPF"
                            margin="normal"
                            value = {detalhes.cpf}
                            InputProps={{
                            readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-read-only-input"
                            label="Identidade"
                            margin="normal"
                            value = {detalhes.identidade}
                            InputProps={{
                            readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="standard-read-only-input"
                            label="Endereço"
                            margin="normal"
                            value = {detalhes.endereco}
                            InputProps={{
                            readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <ThemeProvider theme={theme}>
                        <Button
                            variant="contained" 
                            color="primary" 
                            onClick = {handleReadOnly}>
                            Editar
                        </Button>
                    </ThemeProvider>
                    <Button
                        variant="contained" 
                        color="secundary" 
                        type = "submit">
                        Salvar
                    </Button>
                </Grid>
            </form>          
        </div>
    );
}