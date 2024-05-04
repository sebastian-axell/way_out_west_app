import svgIcons from "./svgIcon";


function ArtistCardSvg({
    type
}){
    return (
        <div class="flex items-center pl-2 sm:pl-4">{svgIcons[type]}</div>
    )
}

export default ArtistCardSvg;