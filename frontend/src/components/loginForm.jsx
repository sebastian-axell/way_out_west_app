import { useState, useEffect } from "react"
import svgIcons from "./svgIcon";

function LoginForm({
    handleSubmit,
    selectedIndex,
    names,
    LoadingComponent
}) {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("")
    const [isShaking, setIsShaking] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorP, setErrorP] = useState(null)
    const formSubmit = async (event) => {
        setLoading(true)
        setErrorP(null);
        event.preventDefault();
        const response = await handleSubmit(names[selectedIndex], password);
        if (response['status'] !== 201) {
            // setIsShaking(true)
            setErrorP(<p className={`font-bold text-red-900 text-center shake`}>{response['message']}</p>)
            // setErrorMessage(response['message'])
        }
        setLoading(false)
        setPassword("");
    };

    useEffect(() => {
        if (errorP) {
            const timer = setTimeout(() => {
                // setIsShaking(false)
                // setErrorMessage("")
                setErrorP(null);
            }, 1000);
            return () => clearTimeout(timer);
        }

    }, [errorP])

    return (
        <div className="">
            {
                errorP ??
                (
                    loading ?
                        <LoadingComponent />
                        :
                        <form onSubmit={formSubmit} className="flex flex-col lg:flex-row relative mt-3">
                            <label htmlFor="password" className="border-2 border-black lg:rounded-lg lg:rounded-r-none p-1 text-center bg-[#F194B4] font-semibold">le password</label>
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
                                <button type="submit" className="lg:absolute right-1 mx-auto mt-2 lg:mt-0 focus:outline-none">
                                    {svgIcons.formButton}
                                </button>
                            </div>
                        </form>
                )
            }

        </div>
    )
}
export default LoginForm