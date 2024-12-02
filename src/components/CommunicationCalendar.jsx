import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CommunicationCalendar = ({ communications }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Filter communications based on the selected date
  };

  return (
    <div>
      <Calendar onChange={handleDateChange} value={date} />
      <div>
        <h3 className="font-bold text-xl underline mt-5">Communications on {date.toLocaleDateString()}</h3>
        {communications
          .filter(
            (comm) => new Date(comm.date).toDateString() === date.toDateString()
          )
          .map((comm, idx) => {
            return (
              <div key={idx}>
                <p>
                  {idx+1}. {comm.type.name} - {comm.company.name} - {comm.notes}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommunicationCalendar;
