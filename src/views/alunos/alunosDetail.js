import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { 
    Grid, 
    Button,
    FormControl,
    TextField,
    CircularProgress
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
      email:"",
      user: {
        _id: "",
        nome: ""
      }
    });
    const [somenteLeitura, setSomenteLeitura] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/alunos/${match.params.id}`).then((response) => {
            setDetalhes(response.data);
            setVisible(false);
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
                <Grid container justify = "center" xs={8} >
                    {visible && <CircularProgress />}
                </Grid>
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
                            label="Email"
                            margin="normal"
                            value = {detalhes.email}
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