import ArtistCardDescription from "./artistCardDescription";

function ArtistCard({
    index,
    artistData
}) {

    const getLocalImgName = (url) => {
        const partial = url.split("uploads")[1].split("0x")[0].split("/")
        let part = partial[partial.length -1];
        return part.slice(0, -2) + ".jpg";
    }

    return (
        <div class="fade-in">
            <div class="max-w-sm md:max-w-lg mx-auto shadow flex flex-col justify-evenly bg-[#FFEBC6] border-2 border-black rounded-lg">
                <div className="w-full h-full flex flex-col text-xs md:text-sm 2xl:text-[15px]">
                    <div class="w-full mx-auto relative">
                        <a href={artistData['link']} class="" target="_blank" rel="noopener noreferrer">
                            <img
                                class="rounded-t-md aspect-square"
                                src={"/images/" + getLocalImgName(artistData['img'])} alt="" />
                        </a>
                        <a
                            href={artistData['link']}
                            id="title"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-full font-bold text-center tracking-tight text-brown-800 -outline-white">
                            <p class="max-w-sm absolute bottom-0 md:max-w-md lg:max-w-full mx-auto p-1 md:p-2 bg-[#F194B4] border-2 border-b-0 border-black rounded-t-lg truncate text-xs md:text-lg">{artistData['artist']}</p>
                        </a>
                    </div>
                    <ArtistCardDescription artistData={artistData} index={index} />
                </div>
            </div>
        </div>
    )
}
export default ArtistCard;