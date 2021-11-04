import { useState } from 'react';

const Calculator = () => {
    const [ result, setResult ] = useState('')
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
    ];

    const unrandom_array = [
        {expression: "="},
        {expression: "+"},
        {expression: "/"},
        {expression: "*"},
        {expression: "-"},
        {expression: "C"},
        {expression: "CE"},
    ]

    const solve = () => { 
        try{
            setResult(eval(result)||'')
        }catch(e){
            setResult('error')
        }
        console.log(result)
    }

    const reset = () => { 
        setResult('')
    }

    const backspace = () => { 
        setResult(result.slice(0,-1))
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
        <div>
            {random_array.map(r=>{
                return(
                    <button name={r.value} onClick={(e)=>{ getInput(e.target.name) }}>{r.value}</button>
                )
            })}
            {unrandom_array.map(r=>{
                return(
                    <button name={r.expression} onClick={(e)=>{ getInput(e.target.name) }}>{r.expression}</button>
                )
            })}
        </div>
    )
}

export default Calculator;