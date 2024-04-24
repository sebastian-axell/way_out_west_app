

function NameBubble({
    name,
    keenness
}) {
    let color;
    switch (keenness){
        case "hella":
            color = "bg-red-400"
            break;
        case "whyNot":
            color = "bg-yellow-400"
            break;
        case "deffo":
            color = "bg-green-400"
            break;
        default:
            color = ""
            break;
    }    
    return (
        <div class="border border-white w-5 h-5 sm:w-6 sm:h-7 md:w-7 xl:w-10 xl:h-10 relative inline-flex items-center justify-center bg-green-300 rounded-full">
            <span class="font-medium text-xs md:text-lg xl:text-2xl text-green-800">{name[0]}</span>
            <span class={`-top-0.5 md:-top-1 md:left-4 left-3 lg:left-5 xl:left-6 lg:-top-0 absolute w-2 h-2 xl:w-3 xl:h-3 border-2 border-white dark:border-gray-800 ${color} rounded-full`}></span>
        </div>
    );
}

export default NameBubble;