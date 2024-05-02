

function SideColumn({
    svg,
    type,
    repeatTimes
}){
  const repeatArray = Array.from({ length: repeatTimes });
  return (
    <div className="bg-teal-300 bg-opacity-50 lg:w-[5rem] xl:w-[6rem] relative hidden lg:block max-h-none overflow-y-clip">
      <div className="rotate-90">
        <div className={`min-w-max flex mt-32 space-x-10 ${type == "dates" ? "-rotate-180" : ""}`}>
          {repeatArray.map((_, index) => (
            <img key={index} className="h-18 py-2" src={`data:image/svg+xml;base64,${svg}`} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default SideColumn;