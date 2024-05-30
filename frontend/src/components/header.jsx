import { Link } from 'react-router-dom';
import { useState } from "react";
import HeaderMenu from './headerMenu';
import HeaderButton from './HeaderButton';


function Header({
}) {
    const [openHeaderMenu, setOpenHeaderMenu] = useState(false)

    const LinkButton = (endpoint) => {
        return (
            <Link to={`/${endpoint.toLowerCase()}`}>
                <button className='' onClick={() => setOpenHeaderMenu(false)}>{endpoint}</button>
            </Link>
        )
    }
    return (

        <div className="h-16 lg:h-20 fixed top-0 z-10 bg-[#F194B4] w-full border-b-2 border-t-2 border-black" id="header">
            <HeaderButton LinkButton={LinkButton} LinkText={"schedule"} />
            <div className="mx-auto w-fit flex h-full pb-1.5 p-2 relative">
                <Link className='flex justify-center' to="/" onClick={() => setOpenHeaderMenu(false)}>
                    <img src="./weoutwest.svg" alt="Example SVG" />
                </Link>
            </div>
            <HeaderMenu setOpenHeaderMenu={setOpenHeaderMenu} openHeaderMenu={openHeaderMenu} LinkButton={LinkButton} />
            <HeaderButton LinkButton={LinkButton} LinkText={"login"} side={"left"} />
        </div>
    )
}
export default Header;