import "./Timetable.style.scss";

export enum Days {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
}

export interface CalendarBlock {
  label: string;
  startTime: string;
  endTime: string;
  days: Days[];
}

interface TimetableProps {
  events: CalendarBlock[];
}

function timeStringToMinutes(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function Timetable({ events }: TimetableProps) {
  const eventsToDisplay = events.filter(
    (event) =>
      event.startTime !== "" &&
      event.endTime !== "" &&
      event.startTime !== "NA" &&
      event.endTime !== "NA"
  );

  return (
    <div className="Timetable">
      <table>
        <thead>
          <tr className="Timetable__head">
            <th></th>
            {Object.values(Days).map((day) => (
              <th key={day}>
                <div>{day}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 22 }, (_, i) => {
            const hour = 8 + Math.floor(i / 2);
            const minute = i % 2 === 0 ? 0 : 30;
            const timeLabel = `${hour}:${minute.toString().padStart(2, "0")}`;

            const slotStartTimeInMinutes = hour * 60 + minute;
            const slotEndTimeInMinutes = slotStartTimeInMinutes + 30;

            return (
              <tr key={timeLabel}>
                <td className={i % 2 === 0 ? "Timetable__cell--time" : ""}>
                  {i % 2 === 0 ? timeLabel : null}
                </td>
                {Object.values(Days).map((day) => {
                  const eventsForCell = eventsToDisplay.filter((event) => {
                    if (!event.days.includes(day)) {
                      return false;
                    }
                    const eventStartTimeInMinutes = timeStringToMinutes(
                      event.startTime
                    );
                    const eventEndTimeInMinutes = timeStringToMinutes(
                      event.endTime
                    );
                    return (
                      eventStartTimeInMinutes < slotEndTimeInMinutes &&
                      eventEndTimeInMinutes > slotStartTimeInMinutes
                    );
                  });

                  return (
                    <td
                      key={day}
                      className={`${
                        eventsForCell.length > 1
                          ? "Timetable__cell--event Timetable__cell--multiple-events"
                          : eventsForCell.length === 1
                          ? "Timetable__cell--event"
                          : ""
                      }`}
                    >
                      {eventsForCell.map((event, index) => {
                        const eventStartTimeInMinutes = timeStringToMinutes(
                          event.startTime
                        );
                        const eventEndTimeInMinutes = timeStringToMinutes(
                          event.endTime
                        );

                        // Adjusted logic for isStart and isEnd
                        const isStart =
                          eventStartTimeInMinutes >= slotStartTimeInMinutes &&
                          eventStartTimeInMinutes < slotEndTimeInMinutes;

                        const isEnd =
                          eventEndTimeInMinutes > slotStartTimeInMinutes &&
                          eventEndTimeInMinutes <= slotEndTimeInMinutes &&
                          !isStart; // Ensure isEnd is not true if isStart is true in the same slot

                        return (
                          <div
                            key={index}
                            className={`Timetable__event ${
                              isStart ? "start" : ""
                            } ${isEnd ? "end" : ""}`}
                            style={{
                              borderTopLeftRadius: isStart ? "10px" : "0",
                              borderTopRightRadius: isStart ? "10px" : "0",
                              borderBottomLeftRadius: isEnd ? "10px" : "0",
                              borderBottomRightRadius: isEnd ? "10px" : "0",
                            }}
                          >
                            <span className="event-label">{event.label}</span>
                          </div>
                        );
                      })}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;