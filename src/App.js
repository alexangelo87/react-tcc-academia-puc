import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import PropTypes from 'prop-types';
import { 
  AppBar, 
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography 
} from "@material-ui/core/";
import MenuIcon from '@material-ui/icons/Menu';
import {  useTheme } from '@material-ui/core/styles';
import Alunos from './views/alunos/alunos';
import Login from './views/login/login';
import purple from '@material-ui/core/colors/purple';
import AlunosCreate from './views/alunos/alunosCreate';
import AlunosDetail from './views/alunos/alunosDetail';
import Instrutores from './views/instrutores/instrutores';
import InstrutoresDetail from './views/instrutores/instrutoresDetail';
import MenuDrawer from './components/menuDrawer';
import useStyles from './styles/styles';
import InstrutoresCreate from './views/instrutores/instrutoresCreate';
import Aulas from './views/aulas/aulas';
import AulasDetail from './views/aulas/aulasDetail';
import AulasCreate from './views/aulas/aulasCreate';
import { isAuthenticated, isAdmin, isAluno } from "./services/auth";
import PresencaCreate from './views/presencas/presencaCreate';

const primary = purple[500]; // #F44336

function App(props) {

  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

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
          <Toolbar>
            <IconButton
              color={primary}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Academia NewGeneration
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <MenuDrawer/>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <MenuDrawer/>
            </Drawer>
          </Hidden>
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
