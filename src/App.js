import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import { 
  AppBar, 
  CssBaseline,

} from "@material-ui/core/";
import Alunos from './views/alunos/alunos';
import Login from './views/login/login';
import AlunosCreate from './views/alunos/alunosCreate';
import AlunosDetail from './views/alunos/alunosDetail';
import Instrutores from './views/instrutores/instrutores';
import InstrutoresDetail from './views/instrutores/instrutoresDetail';
import useStyles from './styles/styles';
import InstrutoresCreate from './views/instrutores/instrutoresCreate';
import Aulas from './views/aulas/aulas';
import AulasDetail from './views/aulas/aulasDetail';
import AulasCreate from './views/aulas/aulasCreate';
import { isAuthenticated, isAdmin, isAluno } from "./services/auth";
import PresencaCreate from './views/presencas/presencaCreate';
import CustomDrawer from './components/customDrawer';
import CustomToolbar from './components/customToolbar';


function App(props) {
  const classes = useStyles();
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() && isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <CustomToolbar/>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <CustomDrawer />
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Login} >
                {isAuthenticated() ? <Redirect to="/alunos" /> : <Login />}
              </Route>
              <PrivateRoute path="/alunos" exact component={Alunos} />
              <PrivateRoute path="/alunos/create" exact component={AlunosCreate} />
              <PrivateRoute path="/alunos/presencas" exact component={PresencaCreate} />
              <PrivateRoute path="/aluno/:id" component={AlunosDetail} />
              <PrivateRoute path="/instrutores" exact component={Instrutores} />
              <PrivateRoute path="/instrutores/create" exact component={InstrutoresCreate} />
              <PrivateRoute path="/instrutor/:id" component={InstrutoresDetail} />
              <PrivateRoute path="/aulas" exact component={Aulas} />
              <PrivateRoute path="/aulas/create"exact component={AulasCreate} />
              <PrivateRoute path="/aulas/presenca"exact component={PresencaCreate} />
              <PrivateRoute path="/aula/:id" component={AulasDetail} />
              <Route path="*" component={() => <h1>Página não encontrada</h1>} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}

App.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default App;
