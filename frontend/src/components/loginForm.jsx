import { useState, useEffect } from "react"
import svgIcons from "./svgIcon";

function LoginForm({
    handleSubmit,
    selectedIndex,
    names
}) {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const [isShaking, setIsShaking] = useState(false)
    const formSubmit = async (event) => {
        event.preventDefault();
        const response = await handleSubmit(names[selectedIndex], password);
        if (response['status'] !== 201) {
            setIsShaking(true)
            setErrorMessage(response['message'])
        }
        setPassword("");
    };

    useEffect(() => {
        if (isShaking) {
            const timer = setTimeout(() => {
                setIsShaking(false)
                setErrorMessage("")
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [errorMessage])

    return (
        <div className="">
            {
                isShaking ?
                    <p className={`font-bold text-red-900 text-center shake`}>{errorMessage}</p>
                    :
                    <form onSubmit={formSubmit} className="flex flex-col lg:flex-row relative mt-3">
                        <label htmlFor="password" className="border-2 border-black lg:rounded-lg lg:rounded-r-none p-1 text-center bg-[#F194B4] font-semibold">enter brocode</label>
                        <input
                            autoFocus
                            className="border-2 lg:border-l-0 border-t-0 lg:border-t-2 lg:rounded-r-lg border-black pl-2 focus:outline-none"
                            type="password"
                            value={password}
                            id="password"
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="get it wrong n ur dead"
                        />
                        <div className="flex items-center">
                            <button type="submit" className="lg:absolute -right-2 mx-auto mt-2 lg:mt-0 focus:outline-none">
                                {svgIcons.formButton}
                            </button>
                        </div>
                    </form>
            }

        </div>
    )
}
export default LoginForm