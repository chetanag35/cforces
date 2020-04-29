import React from "react"

function RatingChanges(props) {
    
    return(
        <div>
            <div className="contestname">{props.item.contestName}
            <span className="contestDetails"> {"Rank:" + props.item.rank}</span> <span className="contestDetails">{"Rating Changes: " + props.item.oldRating + " --->" + props.item.newRating}</span></div>
        </div>
    )
}

export default RatingChanges