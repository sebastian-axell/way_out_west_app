

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
        <div class="border border-black w-6 h-6 lg:w-7 lg:h-7 relative inline-flex items-center justify-center bg-teal-500 rounded-full">
            <span class="font-medium text-sm lg:pb-1 md:text-lg xl:text-xl font-bold">{name[0]}</span>
            <span class={`-top-0.5 md:-top-1 md:left-3 left-3 lg:left-5 lg:-top-0 absolute w-2 h-2 xl:w-2.5 xl:h-2.5 border-2 border-white ${color} rounded-full`}></span>
        </div>
    );
}

export default NameBubble;