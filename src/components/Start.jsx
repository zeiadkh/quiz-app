import React from "react"

export default function Start(props){
    const styles={
        background: "red"
    }
    const styl = {
        background : "yellow"
    }
    
    return(
        <header>
            <div className="text">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button onClick={props.handleSrart} >Start quiz</button>
            </div>
        </header>
    )
}