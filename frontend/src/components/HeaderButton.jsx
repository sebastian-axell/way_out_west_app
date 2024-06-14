

function HeaderButton({
    LinkButton,
    side
}) {
    return (
        <div className={`hidden md:block absolute top-0 h-full flex w-1/4 pr-12 ${side == "left" ? "right-0" : ""}`}>
            <div className={`h-full flex items-center w-full ${side == "left" ? "justify-start" : "justify-end"}`}>
                {LinkButton}
            </div>
        </div>
    )
}
export default HeaderButton