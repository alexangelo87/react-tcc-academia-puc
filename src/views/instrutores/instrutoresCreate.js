import React, {useState} from 'react';
 import { 
    Grid, 
    InputLabel, 
    makeStyles, 
    Input,
    Button,
    FormControl,
    TextField,
    Divider
 } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';


  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
  });

  const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
      margin: theme.spacing(2),
      marginTop: 12
    },
  }));

 export default function  InstrutoresCreate(){

    const [formValues, setFormValues] = useState({
        nome: '',
        identidade: '',
        cpf: '',
        atividade: '',
    });
     const classes = useStyles();

     const handleChange = event => {
        event.persist();
        setFormValues(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value,
        }));
        console.log(formValues);
      };
    const postForm = async (event) => {
        if(window.confirm("Deseja cadastrar esse aluno?")){  
            event.preventDefault();    
            let instrutor = {
                identidade : formValues.identidade,
                cpf: formValues.cpf,
                atividade: formValues.atividade,
                nome: formValues.nome
            }
            try{
                await axios.post('http://localhost:8000/instrutores', instrutor);
                window.alert('Aluno cadastrado com sucesso!');
            } catch (error) {
                window.alert("Erro inesperado: " + error);
            }
        }
    }
    return (
        <div className={classes.root}>     
           <Grid item xs={8}>
                <Grid direction="row" justify="center">
                    <h2>Adicionar instrutor</h2>
                    <Divider/>
                </Grid>           
                <form onSubmit={postForm}>
                    <FormControl fullWidth className={classes.margin}>
                        <TextField
                            label="Nome"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.nome}
                            inputProps={{
                                name: 'nome',
                                id: 'nome',
                            }}
                        />
                        <TextField
                            id="standard-dense"
                            label="CPF"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.cpf}
                            inputProps={{
                                name: 'cpf',
                                id: 'cpf',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="identidade">Identidade</InputLabel>
                        <Input
                            fullWidth 
                            id="identidade" 
                            name="identidade" 
                            type="text"
                            onChange = {handleChange}
                            value={formValues.identidade}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="atividade">Atividade</InputLabel>
                        <Input 
                            fullWidth 
                            id="atividade" 
                            name="atividade" 
                            type="text"
                            onChange = {handleChange}
                            value={formValues.atividade}
                        />
                    </FormControl>
                    <ThemeProvider theme={theme} className={classes.margin}>
                        <Button variant="contained" 
                            color="primary" 
                            type= "submit">
                            Criar
                        </Button>
                    </ThemeProvider>
                </form>
            </Grid>  
        </div>
    );
 }
 