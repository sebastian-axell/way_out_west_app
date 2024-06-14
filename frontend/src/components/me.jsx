import svgIcons from "./svgIcon";
import { useAuth } from "../authContext";
import LoginForm from "./loginForm";
import Profile from "./profile";
import ProfileModule from "./profileModal";
import constants from "../auxiliary/constants";
import { useState, useEffect } from "react";


function Me({ data }) {
    const { isAuthenticated, user, login, logout, updateUser } = useAuth();
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [loading, setLoading] = useState(false)
    const days = ["thursday", "friday", "saturday"]
    const names = constants.names
    
    const handleSubmit = async (name, password) => {
        const response = await login(name, password)
        if (response['status'] != 401) {
            await updateUser({ username: name, email: response['user']['email'], email_updates: response['user']['email_updates'] })
        }
        return response
    }

    const handleLogout = async () => {
        const response = await logout()
    }
    return (
        <ProfileModule loading={loading} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} data={isAuthenticated ? days : constants.names}>
            {
                isAuthenticated ?
                <>
                <Profile days={days} user={user} selectedIndex={selectedIndex} data={data} />
                <button className="flex justify-center mx-auto w-5/12 mt-2 border-2 border-black bg-teal-500 text-white font-bold" onClick={() => logout()}>logout</button>
                </>
                :
                <LoginForm names={names} setLoading={setLoading} handleSubmit={handleSubmit} selectedIndex={selectedIndex}/>
            }
        </ProfileModule>
    )
}
export default Me