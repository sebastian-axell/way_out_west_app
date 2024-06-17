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
        if (response['status'] === 201) {
            await updateUser({ username: name, email: response['data']['email'], email_updates: response['data']['email_updates'] })
        }
        return response
    }

    const LoadingComponent = () => (
        <div className="mx-auto my-auto w-fit animate-logo">
            {svgIcons.loading}
        </div>
    );

    const handleLogout = async () => {
        const response = await logout()
    }
    return (
        <ProfileModule LoadingComponent={LoadingComponent} loading={loading} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} data={isAuthenticated ? days : constants.names}>
            {
                isAuthenticated ?
                    <>
                        <Profile days={days} user={user} selectedIndex={selectedIndex} data={data} LoadingComponent={LoadingComponent}/>
                        <button className="flex justify-center mx-auto w-5/12 mt-2 border-2 border-black bg-teal-500 text-white font-bold" onClick={() => logout()}>logout</button>
                    </>
                    :
                    <LoginForm names={names} LoadingComponent={LoadingComponent} setLoading={setLoading} handleSubmit={handleSubmit} selectedIndex={selectedIndex} />
            }
        </ProfileModule>
    )
}
export default Me