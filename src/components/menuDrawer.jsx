import React from 'react';
import {
    Collapse,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import useStyles from '../styles/styles';
import { Link } from "react-router-dom";

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
            <div>
                
            </div>
            <Divider/>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                <ListItem button onClick={handleClickAluno}>
                    <ListItemText primary="Alunos" />
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
                    <ListItemText primary="Instrutores" />
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
                    <ListItemText primary="Aulas" />
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
                    </List>
                </Collapse>

            </List>
        </div>
    );
}