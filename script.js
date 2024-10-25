var btn = $('#submitDay');

const bellSchedule = {
    1: { start: '8:24 AM', end: '9:31 AM' },
    2: { start: '9:36 AM', end: '10:43 AM' },
    3: { start: '10:48 AM', end: '11:55 AM' },
    4: { start: '12:41 PM', end: '1:48 PM' },
    5: { start: '1:53 PM', end: '3:00 PM' }
};

btn.on("click", () => {
    var selectedDay = $('#dayInput').val();
    
    $.ajax({
      url: `https://api.npoint.io/a61eb6f83be6bc22f6eb`,
      method: "GET",
      success: (data) => {
        const schedule = data.schedule; 
        const daySchedule = schedule.filter(item => item.days.includes(selectedDay));

        $('#scheduleList').empty();

        daySchedule.forEach(item => {
          const time = bellSchedule[item.period];
          const timeText = time ? `${time.start} - ${time.end}` : 'N/A';

          $('#scheduleList').append(`
            <tr>
              <td>${item.period}</td>
              <td>${timeText}</td> <!-- Add time range here -->
              <td>${item.class}</td>
              <td>${item.teacher}</td>
              <td>${item.room}</td>
            </tr>
          `);
        });
      },
      error: () => {
        console.log("We connected to the server, but it returned an error.");
      },
    });
});
