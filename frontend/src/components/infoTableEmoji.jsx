import svgIcons from "./svgIcon";

function InfoTableEmoji({
    setTableActive
}){
    const emojiMapping = {
        "wittle bit": '🤏',
        deffo: '🤝',
        hella: '👌',
    };
    return (
        <div className="z-10 h-screen w-screen bg-opacity-50 bg-pink-200 flex fixed justify-center items-center top-0 left-0 right-0 font-semibold">
        <div className="px-3 md:px-5 py-5 bg-[#FFEBC6] shadow rounded-lg border-2 border-black h-fit w-10/12 sm:w-7/12 lg:w-fit overflow-y-auto">
            <div className='flex justify-end'>
                <button className='sm:-mr-0 lg:-mr-2 sm:-mt-4 -mt-3 -mr-1 relative' onClick={() => setTableActive(false)}>
                    {svgIcons.cross}
                </button>
            </div>
            <div className="text-center">
                <h1 className="text-xl lg:text-3xl font-bold tracking-tight">this page shows who we're keen to see each day</h1>
                <h3 className="text-base lg:text-xl font-semibold tracking-tight mt-2 underline">here's how the emojis work</h3>

                <div className="flex md:flex-row flex-col">
                    {Object.entries(emojiMapping).map(([value, emoji]) => (
                        <div key={value} className="flex justify-start gap-x-2 w-10/12 md:w-8/12 p-4 mx-auto">
                            <p className="p-1 px-1.5 lg:text-xl w-fit rounded-full border-2 border-black bg-teal-500 my-auto">{emoji}</p>
                            <p className="flex p-1 my-auto">means bro is {value} keen</p>
                        </div>
                    ))}
                </div>
                <button className="p-3" onClick={()=>setTableActive(false)}>got it</button>
            </div>
        </div>
    </div>
    )
}

export default InfoTableEmoji