export default function InterestedDetails({
    component
}) {

    return (
        <div className="">
            <div class="flex flex-col w-full justify-center relative p-3 pt-1 gap-y-1" id="peeps">
                <div className="w-full flex justify-center">
                    <p className="tracking-widest font-sans p-1 lg:text-lg text-brown-900 font-semibold">{component.heading}</p>
                </div>
                <div className="w-full flex lg:h-10 h-9">
                    <div className="flex w-full items-center justify-around">
                        {component.component}
                    </div>
                </div>
            </div>
        </div>
    )
}