

function ModalButton({
    onClickHandle,
    text
}){
    return(
        <button class="py-1 px-2 mb-1 md:py-1 lg:py-1.5 md:px-3 lg:px-5 text-sm lg:text-lg font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-teal-50 hover:text-green-800" onClick={()=> onClickHandle()}>{text}</button>
    )
}

export default ModalButton;