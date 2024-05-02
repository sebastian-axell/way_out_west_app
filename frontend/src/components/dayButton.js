

function DayButton({
    selectedDay,
    day,
    handleOnclick,
    svgData
}){
    
    return (
        <button 
            value={day} 
            className={`transition-transform rounded-xl rounded transition ${ selectedDay == day ?  "bg-white border border-green-900" : "bg-pink-100"} px-1 md:px-6  py-1 hover:-translate-y-1 w-3/12 md:w-4/12 mx-2 md:w-fit md:h-10 xl:h-14`} onClick={()=>{handleOnclick(day)}}>
                <img className="pb-0.5 md:pb-1.5 md:h-10 xl:h-12 w-full"  src={`data:image/svg+xml;base64,${btoa(svgData[day])}`} />
        </button>
    )
}

export default DayButton;