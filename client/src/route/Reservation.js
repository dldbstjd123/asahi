import React, {useState} from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Reservation = (props)=>{
    const [selectedDay, setSelectedDay] = useState(null)
    function handleDayClick(day){
      setSelectedDay(day)
    }
    return(
        <div className='bodyContainer'>
	  <DayPicker
	    selectedDays={selectedDay}
	    onDayClick={handleDayClick}
	    fromMonth={new Date()}
            toMonth={new Date(Date.now()+(3600*1000*24*60))} //60days
	    disabledDays={[
		    {before: new Date(Date.now() + ( 3600 * 1000 * 24))},
	    ]}  
	  />    
	</div>
    )
}

export default Reservation;
