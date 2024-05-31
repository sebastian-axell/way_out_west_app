import { Link } from 'react-router-dom';
import { useState } from "react";
import HeaderMenu from './headerMenu';
import HeaderButton from './HeaderButton';


function Header({
}) {
    const [openHeaderMenu, setOpenHeaderMenu] = useState(false)
    const svgPicker = (endpoint) =>{
        switch (endpoint){
            case ("schedule"):
                return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 md:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              
            )
            case ("login"):{
                return (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 md:size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
              </svg>
              )
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
    return (

        <div className="h-16 lg:h-20 fixed top-0 z-10 bg-teal-500 w-full border-b-2 border-t-2 border-black" id="header">
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