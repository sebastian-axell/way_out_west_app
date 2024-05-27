import svgIcons from "./svgIcon";


function ArtistCardSvg({
    type
}){
    return (
        <div class="flex items-center pl-2 sm:pl-4 md:pl-0 md:hidden">{svgIcons[type]}</div>
    )
}

export default ArtistCardSvg;