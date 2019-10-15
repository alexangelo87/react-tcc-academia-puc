import React, {useState} from 'react';
 import { 
    Grid, 
    InputLabel, 
    makeStyles, 
    Input,
    Button,
    FormControl,
    TextField,
    Divider,
    Select,
    MenuItem
 } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { getUserName } from '../../services/auth';
import moment from 'moment';


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

export default function  PresencaCreate(){

    const [formValues, setFormValues] = useState({
      dataPresenca: moment().format('DD-MM-YYYY'),
      horaPresenca: moment().format('h:mm:ss a'),
      aula: "",
      aluno: getUserName(),
      matriculaAluno: ""
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
        if(window.confirm("Deseja registrar essa presença?")){  
            event.preventDefault();    
            let presenca = {
              dataPresenca: formValues.dataPresenca,
              horaPresenca: formValues.horaPresenca,
              aula: formValues.aula,
              aluno: formValues.aluno,
              matriculaAluno : formValues.matriculaAluno
            };
            console.log(presenca)
            try{
                await axios.post('http://localhost:8000/presencas', presenca);
                window.alert('Presença registrada com sucesso!');
            } catch (error) {
                window.alert("Erro inesperado: " + error);
            }
        }
    }
    return (
        <div className={classes.root}>     
           <Grid item xs={8}>
                <div>
                    <h2>Registrar Presença</h2>
                    <Divider/>
                </div>      
                <form onSubmit={postForm}>
                    <FormControl fullWidth className={classes.margin}>
                        <TextField
                            label="Data"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            readOnly
                            value={formValues.dataPresenca}
                            inputProps={{
                                name: 'dataPresenca',
                                id: 'dataPresenca',
                            }}
                        />
                        <TextField
                            id="standard-dense"
                            label="Hora"
                            fullWidth
                            margin="normal"
                            onChange = {handleChange}
                            readOnly
                            value={formValues.horaPresenca}
                            inputProps={{
                                name: 'horaPresenca',
                                id: 'horaPresenca',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="aula">Aula</InputLabel>
                        <Select
                            onChange={handleChange}
                            value = {formValues.aula}
                            inputProps={{
                                name: 'aula',
                                id: 'aula',
                            }}
                            >
                            <MenuItem value={'musculacao'}>Musculação</MenuItem>
                            <MenuItem value={'jiujitsu'}>Jiu-Jitsu</MenuItem>
                            <MenuItem value={'spinning'}>Spinning</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="aluno">Aluno</InputLabel>
                        <Input 
                            fullWidth 
                            id="aluno" 
                            name="aluno" 
                            type="text"
                            value={formValues.aluno}
                            readOnly
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="matriculaAluno">Matrícula</InputLabel>
                        <Input 
                            fullWidth 
                            id="matriculaAluno" 
                            name="matriculaAluno" 
                            type="text"
                            onChange={handleChange}
                            value={formValues.matriculaAluno}
                        />
                    </FormControl>
                    <ThemeProvider theme={theme} className={classes.margin}>
                        <Button variant="contained" 
                            color="primary" 
                            type= "submit">
                            Registrar
                        </Button>
                    </ThemeProvider>
                </form>
            </Grid>  
        </div>
    );
 }