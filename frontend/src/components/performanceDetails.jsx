import svgIcons from "./svgIcon";


export default function PerformanceDetails({
    stage,
    time
}) {
    return (
        <div className="w-full flex justify-around gap-x-2 text-base">
            <div className="flex flex-col items-center gap-x-4 justify-around">
                <p>{svgIcons.location}</p>
                <p className="font-semibold">{stage}</p>
            </div>
            <div className="flex flex-col items-center gap-x-4 justify-around">
                <p className="">{svgIcons.time}</p>
                <p className="font-semibold">{time}</p>
            </div>
        </div>
    )
}