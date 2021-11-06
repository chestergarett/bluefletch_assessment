//dependencies
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
//context
import UserContext from '../../context/user-context';
//css
import classes from './Signup.module.css';
import logo from '../../assets/banner.png';
//components
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const Signup = () => {
    const navigate = useNavigate()
    const { setIsAuthenticated,authorization,setAuthorization } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({username: '', password: '', firstname: '', lastname: ''})
    const [error, setError] = useState(false);

    const signUpUser = () => {
        setIsLoading(true)
        const credentials = {
            username: formData.username,
            password: formData.password,
            firstname: formData.firstname,
            lastname: formData.lastname,
        } 
        axios.post('http://us-central1-bluefletch-learning-assignment.cloudfunctions.net/account/create', qs.stringify(credentials))
        .then( (res)=> {
            setIsLoading(false)
            setAuthorization({...authorization, authorization: res.data.token})
            setIsAuthenticated(true)
            navigate('/Landing')
        })
        .catch( (err)=> {
            setIsLoading(false);
            setError(true);
            console.log(err)
        })
    }
    
    const redirectHome = () => {
        navigate('/')
    }
    return (
        <div className={classes.main}>
            <Card className={classes.form}>
                <img src={logo} alt='logo' className={classes.logo} onClick={redirectHome}/>
                {error ? <span className={classes.errors}>Error in credentials. Please double check.</span> : ''}
                <TextField 
                    id="Username" label="Username" variant="outlined" 
                    onChange={(e)=>setFormData({...formData, username: e.target.value})}
                    className={classes.inputs}
                />
                <TextField 
                    id="Firstname" label="First Name" variant="outlined" 
                    onChange={(e)=>setFormData({...formData, firstname: e.target.value})}
                    className={classes.inputs}
                />
                <TextField 
                    id="Lastname" label="Last Name" variant="outlined" 
                    onChange={(e)=>setFormData({...formData, lastname: e.target.value})}
                    className={classes.inputs}
                />
                <TextField 
                    type="password" id="password" label="Password" variant="outlined" 
                    onChange={(e)=>setFormData({...formData, password: e.target.value})}
                    className={classes.inputs}
                />
                <div className={classes.buttonContainer}>
                    <Button 
                        variant="contained" 
                        onClick={signUpUser} 
                        className={classes.button1}
                    >
                        {isLoading ? <LoadingSpinner/> : 'Sign Up'}
                    </Button>
                    <Divider className={classes.divider}/>
                </div>
            </Card>
        </div>
    )
}

export default Signup;