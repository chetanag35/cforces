import React from "react"
import './index.css'

function Contest(props) {
    const url = "https://codeforces.com/contest/"
    //console.log(props.item.name + " " + props.contest_category + " " + props.item.name.includes(props.contest_category))
    return(
        <div>
            {props.item.phase === "FINISHED" ? (
            <div className="contest"><a 
            href={url + props.item.id} target="_blank" className="contest">{props.item.name}
            </a></div>
            ) : null}
                
        </div>
    )
}

export default Contest