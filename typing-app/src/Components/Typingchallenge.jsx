import React, { useEffect, useState } from 'react'
import '../styles/Typingchallenge.css'

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
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [speed,setSpeed]=useState(0)
    // console.log(keypress)
    
    const normal={
        backgroundColor: '#4f86f7',
        color: 'white',
        height:'35px',
        width:'35px',
        borderRadius:'4px',
        margin:'10px',
        fontWeight:'bold',
        fontSize:'18px'
    }
    const styled={
        backgroundColor: '#ff7f50',
        color: 'white',
        height:'43px',
        width:'43px',
        borderRadius:'4px',
        margin:'15px',
        fontWeight:'bold',
        fontSize:'18px'
    }
    const background={
        backgroundColor:'red'
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
        setSpeed(0)
        generateword()
    }

    const calculatetime=()=>{
        if (cont === '') {
            setStartTime(null);
            setEndTime(null);
          } else if (startTime === null) {
            setStartTime(Date.now());
            console.log('clock started')
          } else if (cont === data) {
            let end_time=Date.now()
            // setEndTime(end_time);

            console.log('clock ended',Date.now())
            calculateTimeInSeconds(end_time)
          }
    }

    const calculateTimeInSeconds = (end_time) => {
        // console.log(startTime,endTime)
        if (startTime !== null && end_time !== null) {
          let timetaken= Math.floor((end_time - startTime) / 1000);
          let wpm= Math.floor(60/timetaken)
          setSpeed(wpm)
          console.log(timetaken)
        }
        // return null;
      };

    useEffect(()=>{
        generateword()
    },[])

    useEffect(() => {
        calculatetime()
      }, [cont, startTime]);

  return (
    <div className='conatiner'>
        <div className='content'><h2>{data===''?'':data}</h2></div>
        <input  placeholder='Re-Type content here...' value={cont} onChange={handlecontent}></input>
        {/* <button onClick={generateword}>New word</button> */}
        <br/>
        <button className='reset' onClick={handlereset}>Reset</button>
        <p className='alert'>{alert?'You entered wrong character!':''}</p>
        <p style={{color:'black'}}>Accuracy : {accuracy===''?'0%':`${accuracy}%`}   WPM : {speed}</p>
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