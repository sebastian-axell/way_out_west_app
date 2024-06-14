function Profile({
    data,
    days,
    selectedIndex,
    user
}) {
    const pattern = new RegExp(`${user.username}-.*`);
    
    return (
        <div className="min-h-[16rem] lg:min-h-[25rem]">
            <div>
            {
                Object.keys(data).map((elem) => (
                    <div className="">
                        <div key={elem} className={`p-3 grid md:grid-cols-2 max-h-[255px] lg:max-h-[400px] overflow-auto ${elem == days[selectedIndex] ? "" : "hidden"}`}>
                            {
                                data[elem].map((item) => (
                                    pattern.test(item['keen']) &&
                                    <div className="px-2">
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