import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { 
    Grid, 
    Button,
    FormControl,
    TextField,
    CircularProgress,
    InputLabel,
    Select,
    MenuItem
 } from '@material-ui/core';
 import { createMuiTheme } from '@material-ui/core/styles';
 import { blue } from '@material-ui/core/colors';
 import { ThemeProvider } from '@material-ui/styles';


 const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

  export default function AulasDetail({ match }) {

    const [detalhes, setDetalhes] = useState({
      _id: "",
      nome: "",
      horarioInicio: "",
      horarioFim: "",
    //   aluno: [],
      instrutor: "Instrutor"
    });
    const [instrutores, setInstrutores] = useState([{_id: "", nome: "Carregando"}]);
    const [somenteLeitura, setSomenteLeitura] = useState(true);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/aulas/${match.params.id}`)
        .then((response) => {
            setDetalhes(response.data);
            setVisible(false)
        })
        .catch((error) => console.log(error));

        axios.get(`http://localhost:8000/instrutores`)
        .then((response) => setInstrutores(response.data));
    },[]);

    let handleReadOnly = () =>{
        setSomenteLeitura(!somenteLeitura);
    }

    const handleUpdate = event => {
        event.preventDefault();
        setDetalhes({
            ...detalhes,
            [event.target.name]: event.target.value,
         });
      };

    let putRequest = event => {
        if(window.confirm("Deseja realmente alterar este aula?")) {
            event.preventDefault();
            let aula = {
                id: detalhes._id,
                nome: detalhes.nome,
                horarioInicio: detalhes.horarioInicio,
                horarioFim: detalhes.horarioFim,
                // aluno: detalhes.aluno,
                instrutor: detalhes.instrutor
            };
            axios.put('http://localhost:8000/aulas', aula)
            .then((response) => {
                console.log(response);
                window.alert("Aula alterada com sucesso!");
            })
            .catch((error)=>{
                console.log(error);
                window.alert("Houve um erro ao atualizar o aula");
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
                            id="horarioInicio"
                            label="Horário Início"
                            margin="normal"
                            value = {detalhes.horarioInicio}
                            onChange = {handleUpdate}
                            name = "horarioInicio"
                            InputProps={{                            
                                readOnly: somenteLeitura
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="horarioFim"
                            label="Horário Fim"
                            margin="normal"
                            value = {detalhes.horarioFim}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "horarioFim",
                                readOnly: somenteLeitura,
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            id="instrutor"
                            label="Instrutor"
                            margin="normal"
                            value = {detalhes.instrutor}
                            onChange = {handleUpdate}
                            InputProps={{
                                name: "instrutor",
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