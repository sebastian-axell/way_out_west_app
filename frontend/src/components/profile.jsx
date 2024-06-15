import { useEffect, useState } from "react";
import svgIcons from "./svgIcon";

function Profile({
    data,
    days,
    selectedIndex,
    user
}) {
    const pattern = new RegExp(`${user.username}-.*`);
    const [loading, setLoading] = useState(false)

    const LoadingComponent = () => (
        <div className="mx-auto my-auto w-fit animate-logo">
            {svgIcons.loading}
        </div>
    );

    useEffect(()=>{
    }, [])
    
    return (
        <div className="min-h-[16rem] lg:min-h-[25rem]">
            <div className="flex items-center h-max ">
            {
                loading ?
                <LoadingComponent />
                :
                Object.keys(data).map((elem) => (
                    <div className="">
                        <div key={elem} className={`p-3 pt-0 pr-1 grid md:grid-cols-2 gap-y-1 max-h-[255px] lg:max-h-[400px] overflow-y-auto w ${elem == days[selectedIndex] ? "" : "hidden"}`}>
                            {
                                data[elem].map((item) => (
                                    pattern.test(item['keen']) &&
                                    <div className="px-2 truncate">
                                        <div className="relative">
                                            <a
                                                href={item['link']}
                                                id="title"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="w-full font-bold text-center tracking-tight text-brown-800">
                                                <p class="truncate">{item['artist']}</p>
                                            </a>
                                            <img src={item['img']} className="border-2 border-black" alt="" />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Profile