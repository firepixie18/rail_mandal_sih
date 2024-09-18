import { memo } from 'react';
import DatePicker from 'react-datepicker';
import {useState} from 'react';
import "react-datepicker/dist/react-datepicker.css";
        
const Datepicker = () => {
    const [selectedDate,setSelectedDate]=useState(null);

    const handleDateChange = (date)=>{
        setSelectedDate(date);
    }
    return (
        <>
        <DatePicker className="bg-white text-black" selected={selectedDate} onChange={handleDateChange} dateFormat="MM/dd/YYYY"/>
        </>
    );
};
export default Datepicker;