import React from 'react';
import {
    Collapse,
    List,
    Divider,
    ListItem,
    ListItemText
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import useStyles from '../styles/styles';

function openPage(page) {
    window.location.href =`/${page}`;
}
export default function MenuDrawer() {
    const [openAluno, setOpenAluno] = React.useState(false);
    const [openInstrutor, setOpenInstrutor] = React.useState(false);
    const [openAula, setOpenAula] = React.useState(false);

    const handleClickAluno = () => {
        setOpenAluno(!openAluno);
    };
    const handleClickInstrutor = () => {
        setOpenInstrutor(!openInstrutor);
    };
    const handleClickAula = () => {
        setOpenAula(!openAula);
    };
    const classes = useStyles;
    return (
        <div>
            <Divider/>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button onClick={handleClickAluno}>
                   <b><h3>Alunos</h3></b>
                    {openAluno ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAluno} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={()=>openPage('alunos')}>
                            <ListItemText primary="Visualizar Alunos" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={()=>openPage('alunos/create')}>
                            <ListItemText primary="Adicionar Aluno" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClickInstrutor}>
                    <b><h3>Instrutores</h3></b>
                    {openInstrutor ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openInstrutor} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={()=>openPage('instrutores')}>
                            <ListItemText primary="Visualizar Instrutores" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={()=>openPage('instrutores/create')}>
                            <ListItemText primary="Adicionar Instrutores" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={handleClickAula}>
                    <b><h3>Aulas</h3></b>
                    {openAula ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openAula} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button className={classes.nested} onClick={()=>openPage('aulas')}>
                            <ListItemText primary="Visualizar Aulas" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={()=>openPage('aulas/create')}>
                            <ListItemText primary="Criar Aula" />
                        </ListItem>
                        <ListItem button className={classes.nested} onClick={()=>openPage('aulas/presenca')}>
                            <ListItemText primary="Registrar Presença" />
                        </ListItem>
                    </List>
                </Collapse>

            </List>
        </div>
    );
}