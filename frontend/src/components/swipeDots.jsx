

export default function SwipeDots(
    {
        items,
        activeIndex,
        goToIndexHandler,
        color
    }
) {
    return (
        items.length > 1 &&
        <div className="flex justify-center items-center">
            {
                items.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2.5 h-2.5 cursor-pointer mx-2 rounded-full border border-black ${index === activeIndex ? color : 'bg-gray-400'
                            }`}
                        onClick={() => goToIndexHandler(index)}
                    ></div>
                ))}
        </div>
    )
}