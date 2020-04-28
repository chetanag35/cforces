import React from "react"

function Contest(props) {
    const url = "https://codeforces.com/contest/"
    //console.log(props.item.name + " " + props.contest_category + " " + props.item.name.includes(props.contest_category))
    return(
        <div className="contest">
            {props.item.phase === "FINISHED" ? (
            <a 
            href={url + props.item.id} >{props.item.name}
            </a>
            ) : null}
                
        </div>
    )
}

export default Contest