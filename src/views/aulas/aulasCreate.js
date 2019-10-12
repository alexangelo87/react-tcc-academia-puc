
 import React, {useState} from 'react';
 import { 
    Grid, 
    makeStyles, 
    Button,
    FormControl,
    TextField
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

 export default function  AulasCreate(){

    const [formValues, setFormValues] = useState({
      nome: "",
      horarioInicio: "",
      horarioFim: "",
      instrutor: ""
    });
     const classes = useStyles();

     const handleChange = event => {
        event.persist();
        setFormValues(inputs => ({
          ...inputs,
          [event.target.name]: event.target.value,
        }));
      };
    const postForm = async (event) => {
        if(window.confirm("Deseja cadastrar essa aula?")){  
            event.preventDefault();    
            let aula = {
              nome: formValues.nome,
              horarioInicio: formValues.horarioInicio,
              horarioFim: formValues.horarioFim,
              instrutor: formValues.instrutor
            };
            try{
                await axios.post('http://localhost:8000/aulas', aula);
                window.alert('Aula cadastrada com sucesso!');
            } catch (error) {
                window.alert("Erro inesperado: " + error);
            }
        }
    }
    return (
        <div className={classes.root}>     
           <Grid item xs={8}>      
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
                            label="Horário início"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.horarioInicio}
                            inputProps={{
                                name: 'horarioInicio',
                                id: 'horarioInicio',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <TextField
                            label="Horário fim"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.horarioFim}
                            inputProps={{
                                name: 'horarioFim',
                                id: 'horarioFim',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <TextField
                            label="Instrutor"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.instrutor}
                            inputProps={{
                                name: 'instrutor',
                                id: 'instrutor',
                            }}
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
 