



function InProgressButton({}){
    return (
    <div className="fixed top-0 left-0 w-full p-1 h-full flex justify-center items-center z-50 animate-scale-in-out">
        <div className="flex bg-amber-700 rounded-full w-fit h-[10rem]">
            <div className="p-5">
                <div className="text-8xl mb-1.5">
                🤔
                </div>
                <span className="text-white font-semibold pl-7 text-white">Updating...</span>
            </div>
        </div>
    </div>
)
}

export default InProgressButton;