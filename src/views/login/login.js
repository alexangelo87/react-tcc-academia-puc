import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from "react-router-dom";
import { 
  Grid,
  Button,
  FormControl 
} from '@material-ui/core'
import api from "../../services/api";
import { login, setRole, setUserName } from "../../services/auth";


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));

function Login(){
   
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    senha: '',
    token:'',
    error: '',
    roles: []
  });

  const handleChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSignIn = async event => {
    event.preventDefault();
    try {
      let credentials = {
        email: values.email,
        senha: values.senha,
      }
      const response = await api.post("/users/auth", credentials);

      console.log(response);
      login(response.data.token);
      setRole(response.data.roles);
      setUserName(response.data.nome);
      // this.props.history.push("/alunos");
      window.location.href = '/alunos/';
    } catch (err) {
      console.log(err)
      setValues({...values, error: "Erro ao autenticar"})
    }
  }

  return (
    <div>
      <form className={classes.container} autoComplete="off" onSubmit={handleSignIn} method="post">
        <Grid justify = "center" container alignItems="center" direction='column'>
          <FormControl>
            <TextField
              id="email"
              name="email"
              label="Usuário"
              value={values.email}
              onChange={handleChange}
              className={classes.textField}
              margin="normal"
              required
            />
          </FormControl>
          <FormControl>
            <TextField
              id="senha"
              label="Senha"
              name= "senha"
              value={values.senha}
              onChange={handleChange}
              className={classes.textField}
              type="password"
              margin="normal"
              required
            />
          </FormControl>
          <FormControl>
            <Button
                variant="contained" 
                color="secundary" 
                type = "submit">
                Entrar
            </Button>
          </FormControl>
        </Grid>

      </form>
    </div>
  );
    
}
 
export default Login;