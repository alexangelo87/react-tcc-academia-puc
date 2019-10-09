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
    },[]);

    let handleReadOnly = () =>{
        if(somenteLeitura) {
            setSomenteLeitura(false);
        } else {
            setSomenteLeitura(true);
        }
        console.log(somenteLeitura);
    }

    const handleUpdate = event => {
        event.preventDefault();
        setDetalhes({
            ...detalhes,
            [event.target.name]: event.target.value,
         });
        console.log(detalhes);
      };

    let putRequest = event => {
        if(window.confirm("Deseja realmente alterar este aluno?")) {
            event.preventDefault();
            let aluno = {
                id: detalhes.id,
                identidade: detalhes.identidade,
                cpf: detalhes.cpf,
                endereco: detalhes.endereco
            };
            axios.put('http://localhost:8000/alunos', aluno)
            .then((response) => {
                console.log(response);
                window.alert("Aluno alterado com sucesso!");
            })
            .catch((error)=>{
                console.log(error);
                window.alert("Houve um erro ao atualizar o aluno");
            })
        }
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
                            id="nome"
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
                            id="cpf"
                            label="CPF"
                            margin="normal"
                            value = {detalhes.cpf}
                            onChange = {handleUpdate}
                            name = "cpf"
                            InputProps={{                            
                                readOnly: somenteLeitura
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="identidade"
                            label="Identidade"
                            margin="normal"
                            value = {detalhes.identidade}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "identidade",
                                readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="endereco"
                            label="Endereço"
                            margin="normal"
                            value = {detalhes.endereco}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "endereco",
                                readOnly: somenteLeitura
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