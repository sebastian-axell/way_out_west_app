import React, {useState, useEffect} from "react";

function Timer({
    duration
}){
    const today = new Date();
    const theDate = new Date('8/08/2024');
    const diffTime = Math.abs(theDate - today);
    const [time,setTime] = useState(diffTime)
    const [days,setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes,setMinutes] = useState()
    const [seconds,setSeconds] = useState()
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTime(time-1000)
        }, 1000);
        updateTimeVars(time)
        return () => clearTimeout(timer);
    }, [time])

    const updateTimeVars = (milliseconds) =>{
        let total_secs = parseInt(Math.floor(milliseconds/1000));
        let total_mins = parseInt(Math.floor(total_secs/60));
        let total_hrs = parseInt(Math.floor(total_mins/60));
        let total_days = parseInt(Math.floor(total_hrs/24));

        let seconds = parseInt(total_secs % 60);
        let minutes = parseInt(total_mins % 60);
        let hours = parseInt(total_hrs% 24);

        // return `${total_days}: ${hours}: ${minutes}: ${seconds}`;
        setDays(total_days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        
        // return [total_days, hours, minutes, seconds];
    };

    return (
        <div className="flex justify-center lg:flex-row gap-5 mt-2 lg:font-bold mb-7">
            <div>
                <span className="font-mono text-lg lg:text-4xl">
                    <span>{days} </span>
                </span>
                days
            </div> 
            <div>
                <span className="font-mono text-lg lg:text-4xl">
                    <span>{hours} </span>
                </span>
                hours
            </div> 
            <div>
                <span className="font-mono text-lg lg:text-4xl">
                    <span>{minutes} </span>
                </span>
                min
            </div> 
            <div>
                <span className="font-mono text-lg lg:text-4xl">
                    <span>{seconds} </span>
                </span>
                sec
            </div>
        </div>
    )
}

export default Timer;