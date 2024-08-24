import LoginForm from "./loginForm";
import ProfileShell from "./profileShell";
import { useState, useContext } from "react";
import { useAuth } from "../authContext";
import UserSelections from "./userSelections";
import constants from "../auxiliary/constants";
import { DataContext } from "./dataContext";


function Me({ data }) {
    // const { isAuthenticated, login, logout, updateUser } = useAuth();
    const [_, isAuthenticated, setAuthenticated] = useContext(DataContext);
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const days = ["thursday", "friday", "saturday"]
    // const names = constants.names
    const names = ["demo user"]

    // const handleSubmit = async (name, password) => {
    //     const response = await login(name, password)
    //     if (response['status'] === 201) {
    //         await updateUser({ username: "seb", email: response['data']['email'], email_updates: response['data']['email_updates'] })
    //     }
    //     return response
    // }

    const login = () =>{
        setAuthenticated(true);
    }

    const handleSubmit = () => {
        login()
        return {"status": 201}
    }

    const logout = () => {
        setAuthenticated(false);
    }

    return (
        <ProfileShell loading={loading} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} data={isAuthenticated ? days : names}>
            {
                isAuthenticated ?
                    <>
                        {/* <UserSelections days={days} user={user} selectedIndex={selectedIndex} data={data}/> */}
                        <>
                            <div className="flex w-10/12 mx-auto font-semibold">
                                <p>this used to be you could see performances you had selected for {days[selectedIndex]}</p>
                            </div>
                        </>
                        <button className="flex justify-center mx-auto w-5/12 mt-2 border-2 border-black bg-teal-500 text-white font-bold" onClick={() => { setSelectedIndex(0); logout() }}>logout</button>
                    </>
                    :
                    <LoginForm names={names} setLoading={setLoading} handleSubmit={handleSubmit} selectedIndex={selectedIndex} />
            }
        </ProfileShell>
    )
}
export default Me