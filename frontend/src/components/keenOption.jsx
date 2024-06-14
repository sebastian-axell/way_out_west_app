

function KeenOption({
    keenLevel,
    idTag,
    name,
    selectedOptions,
    handleChange,
    handOnClick,
    title,
    body,
}) {
    let buttonStyle;
    const emojiMapping = {
        whyNot: '🤏',
        deffo: '🤝',
        hella: '👌',
    };
    switch (keenLevel) {
        case "hella":
            buttonStyle = "peer-checked:border-red-500 peer-checked:text-red-600"
            break;
        case "whyNot":
            buttonStyle = "peer-checked:border-amber-500 peer-checked:text-amber-800"
            break;
        case "deffo":
            buttonStyle = "peer-checked:border-green-500 peer-checked:text-green-800"
            break;
        default:
            buttonStyle = ""
            break;
    }
    return (
        <li className="flex">
            <input onChange={() => handleChange(name, keenLevel)} onClick={() => handOnClick(name, keenLevel)} type="radio" id={idTag} checked={selectedOptions[name] == keenLevel ? true : false} class="hidden peer" required />
            <label for={idTag} className={`h-full inline-flex items-center justify-center w-full p-2 md:p-2 bg-white border-2 text-gray-800 border-gray-400 rounded-lg rounded-r-none cursor-pointer hover:text-gray-600 hover:bg-gray-100 ${buttonStyle}`}>
                <div class="">
                    <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base">{title}</div>
                    <div class="w-fit text-xs sm:text-sm lg:text-base font-normal">{body}</div>
                </div>
            </label>
            <div className={`rounded-lg rounded-l-none border-2 border-l-0 border-gray-400 items-center flex bg-teal-500 ${buttonStyle}`}>{emojiMapping[keenLevel]}</div>
        </li>
    )
}

export default KeenOption;