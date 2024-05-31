import svgIcons from './svgIcon';


function HeaderMenu({
    openHeaderMenu,
    setOpenHeaderMenu,
    LinkButton
}) {
    return (
        <div className="w-full flex flex-col justify-center md:hidden">
            <div className="w-[100px] text-sm mx-auto bg-[#00796B] text-white px-2 rounded-b-lg border-black border-2 border-t-0">
                <div
                    className={`text-black text-base ${openHeaderMenu ? 'ease-in-slow max-height-expanded' : 'ease-in-slow max-height-collapsed'}`}
                >
                    <div className="flex justify-center p-1 text-white">{LinkButton("schedule")}</div>
                    <div className="flex justify-center p-1 text-white">{LinkButton("login")}</div>
                </div>
                <button
                    className="flex w-full justify-center focus:border-green-200"
                    onClick={() => setOpenHeaderMenu(!openHeaderMenu)}
                >
                    {openHeaderMenu ? svgIcons['closeButton'] : svgIcons['openButton']}
                </button>
            </div>
        </div>
    )
}
export default HeaderMenu;