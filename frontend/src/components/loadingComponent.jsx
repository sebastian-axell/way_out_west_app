import svgIcons from "./svgIcon"

export default function LoadingComponent(){
    return (
            <div className="mx-auto my-auto w-fit animate-logo">
                {svgIcons.loading}
            </div>
    )
}