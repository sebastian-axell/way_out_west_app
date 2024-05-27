

function DayButton({
    selectedDay,
    day,
    handleOnclick,
    svgData
}){
    return (
        <div className="flex justify-center items-center cursor-pointer">
            <div 
                value={day} 
                className={`transition-transform rounded-xl rounded transition ${ selectedDay == day ?  "bg-yellow-300 border-2 border-green-900" : "bg-pink-100"} mx-1 sm:mx-0 sm:w-10/12 p-1 hover:-translate-y-1`} onClick={()=>{handleOnclick(day)}}>
                    <img className={`h-8 sm:h-12 md:h-14 xl:h-16 ${ day == "friday" ? "p-0 md:p-1": "p-0.5 md:p-2"}`}  src={`data:image/svg+xml;base64,${btoa(svgData[day])}`} />
            </div>
        </div>
    )
}

export default DayButton;