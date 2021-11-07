//dependencies
import { useEffect, useState, useMemo } from 'react';
//css
import classes from './Calculator.module.css';
//components
import Drawer from '../Drawer/Drawer';
//material
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Calculator = () => {
    const [ result, setResult ] = useState('')
    const [ history, setHistory ] = useState([])

    const random_array = [
        {value: "1" },
        {value: "2" },
        {value: "3" },
        {value: "4" },
        {value: "5" },
        {value: "6" },
        {value: "7" },
        {value: "8" },
        {value: "9" },
    ].sort( () => .5 - Math.random() );

    const unrandom_array = [
        {expression: "CE"},
        {expression: "C"},
        {expression: "."},
        {expression: "+"},
        {expression: "/"},
        {expression: "*"},
        {expression: "-"},
        {expression: "="},
    ]

    const shuffleCards = ( useMemo(()=>{
        return random_array.sort( () => .5 - Math.random() );
    }),[])

    const solve = () => { 
        try{
            setResult(eval(result)||'')
        }catch(e){
            setResult('error')
        }
        setHistory([...history, `${result}=${eval(result)}`])
        console.log(history)
    }

    const reset = () => { 
        setResult('')
    }

    const backspace = () => { 
        try{
            setResult(result.slice(0,-1))
        }catch(e){ 
            setResult('error')
        }
    }

    const getInput = (button) => { 
        if(button==="="){
            solve()
        }
        else if(button==="C"){
            backspace()
        }
        else if(button==="CE"){
            reset()
        }
        else {
            setResult(result+button)
        }
    }

    return (
        <Drawer>
            <DrawerHeader/>
            <div className={classes.section}>
                <div className={classes.main}>
                    <TextField id="calculator-data-display" variant="outlined" className={classes.displayScreen} disabled value={result}/>
                    <div className={classes.container}>
                        <div className={classes.random_grid}>
                        {random_array.map(r=>{
                            return(
                                <Button name={r.value} onClick={(e)=>{ getInput(e.target.name) }} variant="outlined" className={classes.randomButtons}>{r.value}</Button>
                            )
                        })}
                        </div>
                        <div className={classes.unrandom_grid}>
                        {unrandom_array.map(r=>{
                            return(
                                <Button name={r.expression} onClick={(e)=>{ getInput(e.target.name) }} variant="outlined">{r.expression}</Button>
                            )
                        })}
                        </div>
                    </div>
                </div>
                <div className={classes.history}>
                        <List>
                            {history.slice(0).reverse().map(h => {
                                return(
                                    <ListItemText>{h}</ListItemText>
                                )
                            })}
                        </List>
                </div>
            </div>
        </Drawer>
    )
}

export default Calculator;