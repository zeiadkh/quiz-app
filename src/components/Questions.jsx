import React from "react"
import { nanoid } from "nanoid";



export default function Questions(props){

    const [data, setData] = React.useState([])
    const [checked, setChecked] = React.useState(false)
    const [t, setT] = React.useState({})
    const [correctAnswers , setCorrect] = React.useState([])
    function Btn(){
        return (
            <button className="check" onClick={checkAnswers}>check answers</button>
        )
    }

    function choosing(id){
        document.getElementById(id).parentNode.childNodes.forEach(li => {
            li.classList.remove("clicked");
            li.id == id && li.classList.add("clicked")
        })

    }
    function Li(props){

        return (
            <li 
             id = {props.id} onClick={() => choosing(props.id)} > {props.li}
            </li>
        )
    }
   

    function End(){
       
        function click(){
            setChecked(!checked)
        }
            return (
                <div className="end">
                    <button className="play-again" onClick={click}>Play again</button>
                </div>
            )
        
    }
    
        React.useEffect(()=>{
        
        async function fetchData(){
            const response = await fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
            const json = await response.json();
            setCorrect(await json.results.map(item => item.correct_answer))
            setData(json.results)
            setT(await json.results.map(item => shuffleArray([item.correct_answer,...item.incorrect_answers]))
            .map(li => li.map(ans => {return {value:ans, id: nanoid()}})))

            const headerHeight = document.querySelector("header").offsetHeight; 
            window.scrollTo({
            top: headerHeight,
            behavior: "smooth",
            });
    
        }
        
        
        fetchData()
        
    },[checked])
    
    
    
    function shuffleArray(array) {
        const newArray = [...array];
        newArray.sort(() => Math.random() - 0.5);
        return newArray;
    }
    function checkAnswers(e) {
        e.target.classList.add("none")
        document.querySelector(".end").classList.add("flex")
        document.querySelectorAll("li").forEach((li) =>  correctAnswers.forEach(ans=> 
            `${li.textContent.toString().trim()}` === `${ans}`?  li.classList.add("correct"):
            li.classList.contains("clicked")? li.classList.toggle("wrong") : li.classList.remove("wrong")))
    }

    
    return(
        <div className="questions">
            <div className="ques">                              
            
                {data.map(function (item, index)  {
                    
                     
                    return(
                        
                        <div className="block" key={index}>
                            <div className="ques" key={index+1}>{item.question}</div>
                            <div className="ans" key={index+2}>
                                
                                <ul className="answers">
                                    {
                                        t[index].map(obj => <Li  key={obj.id + obj.value} id={obj.id}  li={obj.value} />) 
                                    }
                                </ul>
                            </div>
    
                        </div>
                    
                    )}
                )}
               
            </div>   
           { <Btn checkAnswers={checkAnswers}/>  } 
           { <End />}
        </div>
        
        
    )
    
}



