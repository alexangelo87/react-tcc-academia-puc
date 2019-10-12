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

  export default function InstrutoresDetail({ match }) {

    const [detalhes, setDetalhes] = useState({
      _id: "",
      identidade: "",
      cpf: "",
      atividade: "",
      nome: ""
    });
    const [somenteLeitura, setSomenteLeitura] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/instrutores/${match.params.id}`).then((response) => {
            setDetalhes(response.data);
            setVisible(false);
        }).catch((error) => console.log(error));
    },[]);

    let handleReadOnly = () =>{
        setSomenteLeitura(!somenteLeitura);
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
        if(window.confirm("Deseja realmente alterar este instrutor?")) {
            event.preventDefault();
            let instrutor = {
                id: detalhes.id,
                atividade: detalhes.atividade,
                cpf: detalhes.cpf,
                nome: detalhes.nome
            };
            axios.put('http://localhost:8000/instrutores', instrutor)
            .then((response) => {
                console.log(response);
                window.alert("Instrutor alterado com sucesso!");
            })
            .catch((error)=>{
                console.log(error);
                window.alert("Houve um erro ao atualizar o instrutor");
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
                            value = {detalhes.nome}
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
                            id="atividade"
                            label="Atividade"
                            margin="normal"
                            value = {detalhes.atividade}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "atividade",
                                readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="identidade"
                            label="Atividade"
                            margin="normal"
                            value = {detalhes.identidade}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "identidade",
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