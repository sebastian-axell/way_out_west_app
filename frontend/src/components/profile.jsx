import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile({
    data,
    days,
    selectedIndex,
    user,
    LoadingComponent
}) {
    const pattern = new RegExp(`${user.username}-.*`);
    const [loading, setLoading] = useState(true)
    const [filteredData, setFilteredData] = useState({ "thursday": [], "friday": [], "saturday": [] })

    useEffect(() => {
        const filteredResult = {};
        Object.keys(days).forEach(key => {
            const day = days[key]
            const dataArray = data[day];
            const filteredArray = dataArray.filter(item => pattern.test(item.keen));
            filteredResult[day] = filteredArray;
        });
        setFilteredData(filteredResult)
        setLoading(false)
    }, [days])

    return (
        <div className="min-h-[16rem]">
            {
                loading ?
                    <LoadingComponent />
                    :
                    Object.keys(filteredData).map((elem) => (
                        <div key={elem} className={`p-3 pt-0 pr-1 grid lg:grid-cols-2 gap-y-1 max-h-[255px] overflow-y-auto ${elem == days[selectedIndex] ? "" : "hidden"}`}>
                            {
                                filteredData[elem].length > 0 ?
                                    filteredData[elem].map((item) => (
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
                                    :
                                    <div className="col-span-full flex w-full h-[15rem] items-center justify-center p-5">
                                        <div className="col-span-full p-6 pt-0 pl-3 w-full flex-col gap-y-4 flex justify-center">
                                            <p className="text-center font-semibold">no interest yet</p>
                                            <Link className="border-2 border-black p-1 px-3 mx-auto bg-[#F194B4] font-semibold rounded-lg" to={"/"}>add some</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    ))
            }
        </div>
    )
}

export default Profile