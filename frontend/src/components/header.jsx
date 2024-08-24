import { Link } from 'react-router-dom';
import { useState, useContext } from "react";
import HeaderMenu from './headerMenu';
import HeaderButton from './HeaderButton';
import { useAuth } from "../authContext";
import svgIcons from './svgIcon';
import { DataContext } from "./dataContext";

function Header({
}) {

    const [openHeaderMenu, setOpenHeaderMenu] = useState(false)
    // const { isAuthenticated } = useAuth();
    const [_, isAuthenticated] = useContext(DataContext);
    const svgPicker = (endpoint) => {
        switch (endpoint) {
            case ("schedule"):
                return svgIcons.schedule
            case ("me"): {
                let svg;
                isAuthenticated ?
                svg = svgIcons.login
                :
                svg = svgIcons.profile
                return svg
            }
        }
    }

    const LinkButton = (endpoint) => {
        return (
            <Link to={`/${endpoint.toLowerCase()}`}>
                <button className='text-whit md:p-4' onClick={() => setOpenHeaderMenu(false)}>{svgPicker(endpoint)}</button>
            </Link>
        )
    }
    const scheduleButton = LinkButton('schedule')
    const accountButton = LinkButton('me')
    return (

        <div className="h-16 lg:h-20 fixed top-0 z-10 bg-teal-500 w-full border-b-2 border-t-2 border-black" id="header">
            <HeaderButton LinkButton={scheduleButton} />
            <div className="mx-auto w-fit flex h-full pb-1.5 p-2 relative">
                <Link className='flex justify-center' to="/" onClick={() => setOpenHeaderMenu(false)}>
                    <img src="./weoutwest.svg" alt="Example SVG" />
                </Link>
            </div>
            <HeaderMenu setOpenHeaderMenu={setOpenHeaderMenu} openHeaderMenu={openHeaderMenu} scheduleButton={scheduleButton} accountButton={accountButton} />
            <HeaderButton LinkButton={accountButton} side={"left"} />
        </div>
    )
}
export default Header;