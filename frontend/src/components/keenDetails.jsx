import Tooltip from "./toolTip";
import NameBubble from "./nameBubble";
import svgIcons from "./svgIcon";

export default function KeenDetails({
    keenData,
    isAuthenticated,
    handleClick
}) {
    return (
        <div className="flex w-full items-center justify-around">
            {
                isAuthenticated ?
                    (
                        keenData.length > 0 ?
                            keenData.split(";").map(dataEntry => {
                                const [name, keenness] = dataEntry.split("-");
                                return (
                                    <Tooltip text={name} key={name + keenness}>
                                        <NameBubble name={name} keenness={keenness} />
                                    </Tooltip>
                                );
                            })
                            :
                            <div onClick={handleClick} className="cursor-pointer w-fit text-center mx-auto p-3">
                                {svgIcons.add}
                            </div>
                    )
                    :
                    (
                        <div onClick={handleClick} className="cursor-pointer w-fit text-center mx-auto p-3">
                            {
                                svgIcons.lock
                            }
                        </div>
                    )
            }
        </div>
    )
}