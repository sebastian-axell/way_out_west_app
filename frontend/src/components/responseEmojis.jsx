



function ResponseEmoji({
    state,
    refreshButton
}) {
    let body;
    let bg_color;
    let bodyMargin = "mt-4"
    let emoji;
    switch (state) {
        case "waiting":
            bg_color = "bg-amber-700";
            body = "Updating...";
            emoji = "🤔"
            break;
        case "failed":
            bg_color = "bg-purple-600";
            body = "Uh-oh";
            emoji = "🥲"
            break;
        case "success":
            bg_color = "bg-cyan-600";
            body = "Interest updated";
            bodyMargin = "mt-2"
            emoji = "👌"
            break;
        case "timeout":
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
            <div className={`flex rounded-full w-fit h-[11rem] ${bg_color} flex flex-col`}>
                <div className="p-6 flex flex-col justify-center items-center">
                    <div className="text-8xl">
                        {emoji}
                    </div>
                    <span className={`text-white font-semibold text-white w-full flex justify-center ${bodyMargin}`}>{body}</span>
                </div>
                {
                    refreshButton && <button
                        className="shadow border border-teal-800 rounded-md bg-white flex items-center justify-center gap-x-1 w-fit px-2"
                        onClick={() => window.location.reload()}>let's try that again <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" fill="currentColor"><path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"></path></svg></button>
                }
            </div>
        </div>
    )
}

export default ResponseEmoji;