import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
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
          name: 'Cat in the Hat',
          age: '',
          multiline: '',
          currency: 'EUR',
        });
      
        const handleChange = name => event => {
          setValues({ ...values, [name]: event.target.value });
        };
        return (
          <div>
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="standard-multiline-flexible"
                label="Usuário"
                multiline
                rowsMax="4"
                value={values.multiline}
                onChange={handleChange("multiline")}
                className={classes.textField}
                margin="normal"
              />
            </form>
          </div>
        );
    
}
 
export default Login;