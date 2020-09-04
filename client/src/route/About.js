import React, {useState ,useEffect} from 'react';
import {domain} from '../config.js'
import '../css/About.css'

const About = (props)=>{
    const [location, setLocation] = useState('Location!!')
    const [phone, setPhone] = useState('1-234-5678')
    const [schedule, setSchedule] = useState([])
   

    useEffect(()=>{
      fetch(`${domain}client/hours/get`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSchedule(data);
        });
      },[])    

    return(
        <div className='bodyContainer' id='aboutContainer'>
	  <div>MAP PLACE</div>
	  <div id='aboutRightSide'>
	    <div>{location}</div>
	    <div>{phone}</div>
	    {schedule.map((item)=>{
		if(item.status == 1){
		return(
		  <div className='hourRows' key={item.id}>
		    <div>{item.date.toUpperCase()}</div>
		    <div>{item.openhour}</div>
		    <div>-</div>
		    <div>{item.closehour}</div>
		  </div>
		)
		}else{
		return(
		  <div className='hourRows' key={item.id}>
		    <div>{item.date.toUpperCase()}</div>
		    <div></div>
		    <div>closed</div>
		    <div></div>
		  </div>
		)
		}
	    })}
	  </div>        
        </div>
    )
}

export default About;
