
 import React, {useState} from 'react';
 import { 
    Grid, 
    InputLabel, 
    makeStyles, 
    Input,
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

 export default function  AlunosCreate(){

    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha:'',
        role: ['ALUNO'],
        identidade: '',
        cpf: 0,
        endereco: '',
        user: ''
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
    const viewResult = () => {
        console.log(formValues);
    }
    const postForm = async () => {
        let user = {
                nome: formValues.nome,
                email: formValues.email,
                senha: formValues.senha,
                role: ['ALUNO']
            }
        let aluno = {
            identidade : formValues.identidade,
            cpf: formValues.cpf,
            endereco: formValues.endereco,
            user: formValues.user
        }
        try{
            let userResponse = await axios.post('http://localhost:8000/users', user);
            aluno.user = userResponse.data._id;
            console.log(userResponse)
            console.log(aluno)
            await axios.post('http://localhost:8000/alunos', aluno)
            console.log('Aluno cadastrado com sucesso!');
        } catch (error) {
            console.log("Erro inesperado: " + error);
        }
    }
    return (
        <div className={classes.root}>     
           <Grid item xs={8}>      
                <div >
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
                            label="E-mail"
                            fullWidth
                            name = "email"
                            margin="normal"
                            onChange = {handleChange}
                            value={formValues.email}
                            inputProps={{
                                name: 'email',
                                id: 'email',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="senha">Senha</InputLabel>
                        <Input 
                            fullWidth 
                            id="senha" 
                            name="senha" 
                            type="password"
                            onChange = {handleChange}
                            value={formValues.senha}
                            inputProps={{
                                name: 'senha',
                                id: 'senha',
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="confirmarSenha">Confirmar Senha</InputLabel>
                        <Input 
                            fullWidth 
                            id="confirmarSenha" 
                            type="password"
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
                        <InputLabel htmlFor="cpf">CPF</InputLabel>
                        <Input 
                            fullWidth 
                            id="cpf" 
                            name="cpf" 
                            type="number"
                            onChange = {handleChange}
                            value={formValues.cpf}
                        />
                    </FormControl>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel htmlFor="endereco">Endereço</InputLabel>
                        <Input 
                            fullWidth 
                            id="endereco" 
                            name="endereco" 
                            type="text"
                            onChange = {handleChange}
                            value={formValues.endereco}
                        />
                    </FormControl>

                    <ThemeProvider theme={theme} className={classes.margin}>
                        <Button variant="contained" 
                            color="primary" 
                            type= "submit"
                            onClick = {postForm}>
                            Criar
                        </Button>
                    </ThemeProvider>
                </div>
            </Grid>  
        </div>
    );
 }
 