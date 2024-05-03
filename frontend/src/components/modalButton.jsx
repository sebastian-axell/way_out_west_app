

function ModalButton({
    onClickHandle,
    text
}){
    return(
        <button 
            class={
                `py-1 px-2 mb-1 md:py-1 lg:py-1.5 md:px-3 lg:px-5 
                text-sm lg:text-lg font-semibold text-gray-800 
                bg-white rounded-full border border-gray-400 hover:border-gray-600 focus:border-gray-600 focus:outline-none 
                ${text == "Cancel" ? "hover:bg-red-50" : "hover:bg-teal-50" }`} 
            onClick={()=> onClickHandle()}>
                {text}
        </button>
    )
}

export default ModalButton;