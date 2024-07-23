import { useState, useEffect } from "react";

function KeenOption({
    optionLevel,
    handleOnClick,
    keenLevel
}) {
    const emojiMapping = {
        whyNot: '🤏',
        deffo: '🤝',
        hella: '👌',
    };
    const [body, setBody] = useState("")
    const [title, setTitle] = useState("")
    const [buttonStyle, setButtonStyle] = useState("")
    useEffect(() => {
        switch (optionLevel) {
            case "hella":
                setButtonStyle("peer-checked:border-red-500 peer-checked:text-red-600");
                setTitle("hella keen");
                setBody("bruh I'm going");
                break;
            case "whyNot":
                setButtonStyle("peer-checked:border-amber-500 peer-checked:text-amber-800");
                setTitle("wittle bit keen");
                setBody("don't mind going");
                break;
            case "deffo":
                setButtonStyle("peer-checked:border-green-500 peer-checked:text-green-800");
                setTitle("deffo keen");
                setBody('tis be a good one');
                break;
            default:
                setButtonStyle("");
                setTitle("");
                setBody("");
                break;
        }
    }, []);
    return (
        <li className="flex">
            <input
                onClick={() => handleOnClick(optionLevel)}
                type="radio" id={optionLevel}
                checked={keenLevel === optionLevel}
                class="hidden peer" required />
            <label
                htmlFor={optionLevel}
                className={`h-full inline-flex items-center justify-center w-full p-2 md:p-2 bg-white border-2 text-gray-800 border-gray-400 rounded-lg rounded-r-none cursor-pointer hover:text-gray-600 hover:bg-gray-100 ${buttonStyle}`}>
                <div class="">
                    <div class="w-full mx-auto sm:w-fit text-xs sm:text-sm lg:text-base">{title}</div>
                    <div class="w-fit text-xs sm:text-sm lg:text-base font-normal">{body}</div>
                </div>
            </label>
            <div className={`rounded-lg rounded-l-none border-2 border-l-0 border-gray-400 items-center flex bg-teal-500 ${buttonStyle}`}>{emojiMapping[optionLevel]}</div>
        </li>
    )
}

export default KeenOption;