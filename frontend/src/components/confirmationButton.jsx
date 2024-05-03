

function ConfirmationButton({}){
    return (
    <div className="fixed top-0 left-0 w-full p-1 h-full flex justify-center items-center z-50 animate-scale-in-out">
        <div className="flex bg-cyan-600 rounded-full w-fit h-[10rem]">
            <div className="p-5">
                <div className="text-8xl">
                👌
                </div>
                <span className="text-white font-semibold pl-1.5 text-white">Interest updated</span>
            </div>
        </div>
    </div>
)
}

export default ConfirmationButton;