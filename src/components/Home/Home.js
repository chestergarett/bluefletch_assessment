//dependencies
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
//context
import UserContext from '../../context/user-context';
//css
import classes from './Home.module.css';
import logo from '../../assets/banner.png';
//components
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
//material
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';


const initialState = {
    username: '',
    password: '',
}

const Home = () => { 
    const navigate = useNavigate()
    const { setIsAuthenticated,authorization,setAuthorization } = useContext(UserContext);
    const [formData, setFormData] = useState(initialState)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const loginUser = () => {
        setIsLoading(true)
        const credentials = {
            username: formData.username,
            password: formData.password
        } 
        axios.post('http://us-central1-bluefletch-learning-assignment.cloudfunctions.net/account/login', qs.stringify(credentials))
        .then( (res)=> {
            setIsLoading(false)
            setAuthorization({...authorization, authorization: res.data.token})
            localStorage.setItem('authorization', JSON.stringify({authorization: res.data.token}))
            setIsAuthenticated(true)
            navigate('/Landing')
        })
        .catch( (err)=> {
            setIsLoading(false)
            setError(true)
            console.log(err.response)
        })
    }

    const signUpRedirect = () => {
        navigate('/Signup')
    }

    return (
        <div className={classes.main}>
            <Card className={classes.form}>
                <img src={logo} alt='logo' className={classes.logo}/>
                {error ? <span className={classes.errors}>Error in credentials. Please double check.</span> : ''}
                <TextField 
                    id="Username" label="Username" variant="outlined" 
                    onChange={(e)=>setFormData({...formData, username: e.target.value})}
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
                        onClick={loginUser} 
                        className={classes.button1}
                    >
                        {isLoading ? <LoadingSpinner/> : 'Login'}
                    </Button>
                    <Divider className={classes.divider}/>
                    <Button 
                        variant="contained"
                        className={classes.button2}
                        onClick={signUpRedirect}
                    >
                        Sign up
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Home;