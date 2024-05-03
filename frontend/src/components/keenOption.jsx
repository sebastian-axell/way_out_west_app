

function KeenOption({
    keenLevel,
    idTag,
    name,
    selectedOptions,
    handleChange,
    handOnClick,
    title,
    body,
}){
    let buttonStyle;
    switch (keenLevel){
        case "hella":
            buttonStyle = "peer-checked:border-red-200 peer-checked:text-red-600"
            break;
        case "whyNot":
            buttonStyle = "peer-checked:border-amber-400 peer-checked:text-amber-900"
            break;
        case "deffo":
            buttonStyle = "peer-checked:border-green-200 peer-checked:text-green-600"
            break;
        default:
            buttonStyle = ""
            break;
    }    
    return (
        <li>
            <input onChange={()=>handleChange(name, keenLevel)} onClick={()=>handOnClick(name, keenLevel)} type="radio" id={idTag} checked={selectedOptions[name] == keenLevel ? true : false} class="hidden peer" required />
            <label for={idTag} className={`h-full inline-flex items-center justify-center w-fit p-1 md:p-2 bg-white border text-gray-800 border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 hover:bg-gray-100 ${buttonStyle}`}>                           
                <div class="">
                    <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base font-semibold">{title}</div>
                    <div class="w-fit text-xs sm:text-sm lg:text-base">{body}</div>
                </div>
            </label>
        </li>
    )
}

export default KeenOption;