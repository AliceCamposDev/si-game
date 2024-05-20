import { useEffect, useState } from "react"
import "./Calendar.css"

function Calendar (props: any){
    let day = document.getElementsByClassName('day') as HTMLCollectionOf<HTMLElement> 
    
    useEffect(() => {

        if (day.length > 0  && props.day - 1 < day.length){
            if (props.day  > 1){
                day[props.day  - 2].style.backgroundColor = "lightgray"
                day[props.day-1].scrollIntoView({ block: 'start',  behavior: 'smooth' })
            }
            day[props.day -1].style.backgroundColor = "gray"
         }
         
    },[props.day ]) 
    

    return(
        <div className="calendarContainer" >
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
        </div>
    )
}
export default Calendar 