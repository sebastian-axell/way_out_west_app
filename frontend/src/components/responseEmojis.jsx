import svgIcons from "./svgIcon";




function ResponseEmoji({
    state,
    refreshButton
}) {
    let body;
    let bg_color;
    let bodyMargin = "mt-4"
    let emoji;
    switch (state) {
        case "demo":
            bg_color = "bg-cyan-600";
            body = "example response";
            bodyMargin = "mt-2"
            emoji = "😻"
            break;
        case "waiting":
            bg_color = "bg-amber-700";
            body = "Updating...";
            emoji = "🤔"
            break;
        case "failed":
            bg_color = "bg-purple-600";
            body = "Something failed";
            emoji = "🥲"
            break;
        case "success":
            bg_color = "bg-cyan-600";
            body = "Interest updated";
            bodyMargin = "mt-2"
            emoji = "👌"
            break;
        case "timeout":
        case "Request timed out":
            bg_color = "bg-red-600";
            body = "Request timed out";
            bodyMargin = "mt-2"
            emoji = "⏲"
            break;
        case "Token expired":
        case "Forbidden":
        case "Token is missing":
        case "Unauthorized":
            emoji = "🔒"
            bg_color = "bg-slate-600";
            body = state
            break;
        default:
            bg_color = "bg-cyan-600";
            body = "Uh-oh"
            emoji = "🤷‍♂️"
            break;
    }

    return (
        <div className="fixed top-0 left-0 w-full p-1 h-full flex justify-center items-center z-50 animate-scale-in-out">
            <div className={`flex flex-col justify-center items-center w-fit gap-y-4`}>
                <div className={`${bg_color} w-48 h-48 rounded-full flex justify-center items-center relative`}>
                    <div className="text-8xl pb-5">{emoji}</div>
                    <span className={`text-white absolute bottom-6 font-semibold text-white w-full flex justify-center`}>{body}</span>
                </div>
                {
                    refreshButton &&
                    <button
                        className="shadow border border-teal-800 rounded-md bg-white flex items-center justify-center gap-x-1 w-fit px-2 py-0.5"
                        onClick={() => window.location.reload()}
                    >let's try that again {svgIcons.heart}
                    </button>
                }
            </div>
        </div>
    )
}

export default ResponseEmoji;