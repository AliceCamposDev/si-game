import { useEffect, useState } from "react"
import "./Calendar.css"

function Calendar (){
    let day = document.getElementsByClassName('day') as HTMLCollectionOf<HTMLElement> 
    const [currentDay, setCurrentDay] = useState (0)

    useEffect(() => {

        if (day.length > 0  && currentDay < day.length){
            if (currentDay > 0){
                day[currentDay - 1].style.backgroundColor = "lightgray"
            }
            day[currentDay].style.backgroundColor = "lightblue"
         }
    },[currentDay]) 
    
    function passDay(){
        setCurrentDay(currentDay+1)
    }
    return(
        <div className="calendarContainer">
            <div id="scrollstyle" className="calendar">
                <div className = "day">01</div>
                <div className = "day">02</div>
                <div className = "day">03</div>
                <div className = "day">04</div>
                <div className = "day">05</div>
                <div className = "day holiday">06</div>
                <div className = "day holiday">07</div>
                <div className = "day">08</div>
                <div className = "day">09</div>
                <div className = "day">10</div>
                <div className = "day">11</div>
                <div className = "day">12</div>
                <div className = "day holiday">13</div>
                <div className = "day holiday">14</div>
                <div className = "day">15</div>
                <div className = "day">16</div>
                <div className = "day">17</div>
                <div className = "day">18</div>
                <div className = "day">19</div>
                <div className = "day holiday">20</div>
                <div className = "day holiday">21</div>
                <div className = "day">22</div>
                <div className = "day">23</div>
                <div className = "day">24</div>
                <div className = "day">25</div>
                <div className = "day">26</div>
                <div className = "day holiday">27</div>
                <div className = "day holiday">28</div>
                <div className = "day">29</div>
                <div className = "day">30</div>
            </div>
            <button onClick={() => passDay()}>abacaxi</button>
        </div>
    )
}
export default Calendar 