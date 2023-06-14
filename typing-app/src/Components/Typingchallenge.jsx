import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Typingchallenge = () => {

    // const abc=useSelector((store)=>store.content)
    // console.log(abc)

    const [data,setData]=useState('')
    const [cont,setCont]=useState('')
    const [alert,setAlert]=useState(false)
    const [count,setCount]=useState(0)
    const [check,setCheck]=useState({correct:0,incorrect:0})
    const [accuracy,setAcuuracy]=useState('')
    const [prevlength,setPrevlength]=useState(0)
    const [prevcheck,setPrevcheck]=useState({corr:false,incorr:false})
    const [keypress,setkeypress]=useState(0)
    // console.log(keypress)
    
    const normal={
        backgroundColor: 'blue',
        color: 'white',
        height:'35px',
        width:'35px',
        borderRadius:'4px',
        margin:'10px'
    }
    const styled={
        backgroundColor: 'red',
        color: 'white',
        height:'43px',
        width:'43px',
        borderRadius:'4px',
        margin:'10px'
    }

    const generateword=()=>{
        let char=['a','s','d','f','j','k','l',';']
        let till=Math.floor(Math.random()*4)+6
        // setlength(till)
        let generatedword=''

        for(let i=0;i<till;i++){
          let x= Math.floor(Math.random()*8)
          generatedword+=char[x]
        }
        setData(generatedword)
    }

    const handlecontent=(e)=>{
        let val=e.target.value
        let track=''
        setCont(val)
        setPrevlength(val.length)
        setkeypress(keypress+1)
        // console.log(val)
        if(val[val.length-1]===data[count]&&prevlength===val.length-1){
            setCheck({...check,correct:check.correct+1})
            setCount(count+1)
            setPrevcheck({...prevcheck,corr:true,incorr:false})
            // setAlert(false)
            track=true
            
        }else if(prevlength===val.length-1){
            // console.log('incorrect')
            setCheck({...check,incorrect:check.incorrect+1})
            setCount(count+1)
            setPrevcheck({...prevcheck,corr:false,incorr:true})
            setAlert(true)
            track=false
        }else{
            setCount(count-1)
            setAlert(false)
            if(prevcheck.corr){
                setCheck({...check,correct:check.correct-1})
            }
            // else{
            //     setCheck({...check,incorrect:check.incorrect-1})
            // }
        }
        if(val.length===data.length&&track){
        let measure_accuracy=((data.length-check.incorrect)/data.length)*100
        setAcuuracy(Math.floor(measure_accuracy))
        }else if(val.length===data.length&&!track){
        let measure_accuracy=((data.length-check.incorrect)/data.length)*100
        setAcuuracy(Math.floor(measure_accuracy))
        }
    }

    const handlereset=()=>{
        setData('');
        setCont('');
        setCount(0)
        setCheck({...check,correct:0,incorrect:0});
        setAcuuracy('');
        setPrevlength(0)
        setPrevcheck({...prevcheck,corr:false,incorr:false});
        setkeypress(0)
        setAlert(false)
        generateword()
    }

    useEffect(()=>{
        generateword()
    },[])

  return (
    <div>
        <h2>{data===''?'':data}</h2>
        <input placeholder='Re-Type content here' value={cont} onChange={handlecontent}></input>
        {/* <button onClick={generateword}>New word</button> */}
        <button onClick={handlereset}>Reset</button>
        <p style={{color:'red'}}>{alert?'You entered wrong character':''}</p>
        <p>Accuracy : {accuracy===''?'0%':`${accuracy}%`}</p>
        <div className='keys'>
            <button style={count===0?data[count]==='a'?styled:normal :data[count]==='a'?styled:normal}>a</button>
            <button style={count===0?data[count]==='s'?styled:normal :data[count]==='s'?styled:normal}>s</button>
            <button style={count===0?data[count]==='d'?styled:normal :data[count]==='d'?styled:normal}>d</button>
            <button style={count===0?data[count]==='f'?styled:normal :data[count]==='f'?styled:normal}>f</button>
            <button style={count===0?data[count]==='j'?styled:normal :data[count]==='j'?styled:normal}>j</button>
            <button style={count===0?data[count]==='k'?styled:normal :data[count]==='k'?styled:normal}>k</button>
            <button style={count===0?data[count]==='l'?styled:normal :data[count]==='l'?styled:normal}>l</button>
            <button style={count===0?data[count]===';'?styled:normal :data[count]===';'?styled:normal}>;</button>
        </div>
    </div>
  )
}

export default Typingchallenge