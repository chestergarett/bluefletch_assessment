//dependencies
import { useState, useContext } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { v4 } from 'uuid';
//css
import classes from './Sidebar.module.css';
//material
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//icons
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import HelpIcon from '@mui/icons-material/Help';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DialpadIcon from '@mui/icons-material/Dialpad';

const options = [
    {key: v4(), text: 'Feed', icon: <HomeIcon className={classes.icons} />, link: '/Landing'},
    {key: v4(), text: 'Calculator', icon: <DialpadIcon className={classes.icons} />, link: '/Calculator'},
    {key: v4(), text: 'Placeholder', icon: <FastfoodIcon className={classes.icons} />, link: '/Landing'},
    {key: v4(), text: 'Placeholder', icon: <FitnessCenterIcon className={classes.icons} />, link: '/Landing'},
    {key: v4(), text: 'Placeholder', icon: <NotificationsIcon className={classes.icons} />, link: '/Landing'},
    {key: v4(), text: 'Placeholder', icon: <MoveToInboxIcon className={classes.icons} />, link: '/Landing'},
    {key: v4(), text: 'Placeholder', icon: <HelpIcon className={classes.icons}/>, link: '/Landing'},
]
const Sidebar = () => {
    // const { openModals, closeModals,  displayModal} = useContext(UserContext);
    const [displayModal, setDisplayModal] = useState(false)
    
    const openModalHandler = () => {
      setDisplayModal(true)
    }
    
    const closeModalHandler = () => {
      setDisplayModal(false)
    }

    return (
      <>
        <List>
          {options.map((option) => (
              <BrowserLink to={option.link} key={v4()}>
                <ListItem button key={v4()}>
                  <ListItemIcon>
                    {option.icon}
                  </ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
            </BrowserLink>
          ))}
        </List>
      </>
    )
}

export default Sidebar;