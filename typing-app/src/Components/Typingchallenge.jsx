import React, { useEffect, useState } from 'react'
import '../styles/Typingchallenge.css'
import backimage from  '../assets/back.png'

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
    const [seconds, setSeconds] = useState(5 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [wrongcount,setWrongcount]=useState(0)
    // console.log(keypress)
    
    const normal={
        // backgroundColor: '#4f86f7',
        backgroundColor: 'transparent',
        color: 'white',
        height:'35px',
        width:'35px',
        borderRadius:'4px',
        margin:'10px',
        fontWeight:'bold',
        fontSize:'18px',
        border:'1px solid white'
    }
    const styled={
        // backgroundColor: '#ff7f50',
        backgroundColor: 'white',
        color: 'black',
        height:'50px',
        width:'50px',
        borderRadius:'4px',
        margin:'20px',
        fontWeight:'bold',
        fontSize:'30px'
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
            // setCount(count+1)
            setPrevcheck({...prevcheck,corr:false,incorr:true})
            setAlert(true)
            setWrongcount(wrongcount+1)
            track=false
        }else{
            // setCount(count-1)
            setAlert(false)
            setWrongcount(wrongcount-1)
            if(prevcheck.corr){
                setCheck({...check,correct:check.correct-1})
            }
            // else{
            //     setCheck({...check,incorrect:check.incorrect-1})
            // }
        }
        if(cont===''){
            handletimer()
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
        setSeconds(5*60)
        clearInterval(isRunning)
        // clearInterval(timer)
        generateword()
    }

    const calculatetime=()=>{
        if (cont === '') {
            setStartTime(null);
            setEndTime(null);
          } else if (startTime === null) {
            setStartTime(Date.now());
          } else if (cont === data) {
            let end_time=Date.now()
            calculateTimeInSeconds(end_time)
          }
    }

    const calculateTimeInSeconds = (end_time) => {
        // console.log(startTime,endTime)
        if (startTime !== null && end_time !== null) {
          let timetaken= Math.floor((end_time - startTime) / 1000);
          let wpm= Math.floor(60/timetaken)
          setSpeed(wpm)
        //   console.log(timetaken)
        }
      };

      const handletimer=()=>{
        setIsRunning(setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);
          }, 1000))

          return () => clearInterval(isRunning);
      }

    useEffect(()=>{
        generateword()
    },[])

    useEffect(() => {
        calculatetime()
        // handletimer()
      }, [cont, startTime]);

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const {corr,incorr}=prevcheck
  return (
    <div className='main' style={{backgroundImage:`url(${backimage})`}}>
    <div className='container' >
        <div className='content'><h2>{data===''?'':data}</h2></div>
        <input  placeholder='Re-Type content here...'   value={cont} onChange={handlecontent}></input>
        <br/>
        <button className='reset' onClick={handlereset}>Reset</button>
        
            <p className='alert'>{alert?'Oops! That key was incorrect!':''}</p>
            <p className='nice'>{cont===data&&accuracy===100?"Nice job! Keep it up.":''}</p>
            <p className='average'>{cont===data&&accuracy<100?"Doing well. Needs more practice":''}</p>
            <div>
                {seconds > 0 ? (
                    <h2 style={minutes<1?{color:'red'}:{color:'green'}}>
                    {minutes}:{remainingSeconds < 10 ? '0' : ''}
                    {remainingSeconds} min
                    </h2>
                ) : (
                    <h2 style={{color:'black'}}>Time's up!</h2>
                )}
            </div>
            
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
        <div className='result'>
                <p className='accuracy'>Accuracy : {accuracy===''?'0%':`${accuracy}%`}  </p>
                <p className='accuracy'>WPM : {speed}</p>
                <p className='accuracy'>Pressed key count : {keypress}</p>
        </div>
    </div>
    </div>
  )
}

export default Typingchallenge