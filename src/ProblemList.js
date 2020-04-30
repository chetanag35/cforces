import React from "react"

function ProblemList(props){

    const url = "https://codeforces.com/contest/" + props.item.contestId + "/problem/" + props.item.index 

    return(
        <div style={{margin:"5px",padding:"5px"}}>
            <a style={{textDecoration:"none",color:"#111"}} href={url} target="_blank">{props.item.name}</a>
            <span style={{float:"right"}}>{props.item.rating}</span>
            <hr/>
        </div>
    )
}


export default ProblemList