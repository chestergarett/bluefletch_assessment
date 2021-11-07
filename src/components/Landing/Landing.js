//dependencies
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
//css
import classes from './Landing.module.css';
//context
import UserContext from '../../context/user-context';
//components
import Drawer from '../Drawer/Drawer'
import LoadingSpinnerDark from '../LoadingSpinner/LoadingSpinnerDark';
//material
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Card from '@mui/material/Card';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Landing = () => {
    const { authorization, feed, setFeed } = useContext(UserContext)
    const [limit, setLimit] = useState(5);
    const [isLoading, setIsLoading] = useState(false)

    useEffect( ()=> {
        setIsLoading(true);
        axios.get('http://us-central1-bluefletch-learning-assignment.cloudfunctions.net/feed',{
            headers:  authorization 
        })
        .then( (res)=> {
            console.log(res.data.slice(0,limit))
            setFeed(res.data.slice(0,limit));
            setIsLoading(false);
        })
        .catch( (err)=>{
            console.log(err);
            console.log(authorization);
            setIsLoading(false);
        })
    }, [limit])

    const handleChange = (event) => {
        setLimit(event.target.value)
    }

    return(
        <Drawer>
            <DrawerHeader/>
            {isLoading ? <LoadingSpinnerDark/> : 
                <div className={classes.container}>
                    <div className={classes.select}>
                        <FormControl>
                            <InputLabel id="limit-select">Limit</InputLabel>
                            <Select
                                labelId="limit-select"
                                id="limit-select-id"
                                value={limit}
                                label="Limit"
                                onChange={handleChange}
                                className={classes.selectDropdown}
                                >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'whitesmoke' }}>
                {feed.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt)}).map( (f)=> {
                    return (
                        <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={f.user.profilePic} src={f.user.profilePic} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography className={classes.userName}>@{f.user.username}</Typography>}
                                secondary={
                                    <>
                                    <Typography
                                        className={classes.date}
                                        component="span"
                                        color="text.primary"
                                    >
                                        {moment(f.createdAt).format('MMM DD YYYY hh:mm A')}
                                    </Typography>
                                    <Typography className={classes.mainText}>{f.text}</Typography>
                                    </>
                                }
                            />
                        </ListItem>
                        <Divider/>
                        </>
                    )
                } )}
                </List>
                </div>}
        </Drawer>
    )
}

export default Landing;