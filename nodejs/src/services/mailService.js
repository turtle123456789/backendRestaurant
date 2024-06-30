import transporter from "../config/nodeMailer";

const notifyOrderPlaceSuccess = async (data) => {
  let [hours, minutes] = data.resTime.split(":");
  let date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  // Add 15 minutes
  date.setMinutes(date.getMinutes() + 15);

  // Convert back to a string
  let newHours = date.getHours().toString().padStart(2, "0");
  let newMinutes = date.getMinutes().toString().padStart(2, "0");
  let newResTime = `${newHours}:${newMinutes}`;
  return await transporter.sendMail({
    from: '"VŨ THÙY LINH" <vuthuylinh23082002@gmail.com>',
    to: `${data.email}`,
    subject: "RESERVATION CONFIRMATION",
    text: "Reservation Confirmation",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reservation Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .header {
          text-align: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        .header p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }
        .header a {
          color: #007bff;
          text-decoration: none;
        }
        .content {
          padding: 20px  0;
        }
        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .details {
          display: flex;
          flex-direction: column;
           margin-right: 20px;
        }
           .details div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
        .details img {
          margin-right: 10px;
        }
        .confirmed {
          text-align: center;
          color: green;
          flex-shrink: 0;
        }
        .confirmed img {
          display: block;
          margin: 0 auto 5px;
          width: 72px;
          height: 72px;
          color: #54ad7a;
        }
        .footer {
          border-top: 1px solid #ddd;
          padding-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>HOT POT</h1>
          <p>19, Nguyen An Ninh, Hoang Mai, Ha Noi, +441592261635</p>
          <p>
            <a href="https://www.facebook.com/weareoneEXO">www.facebook.com/weareoneEXO</a>
          </p>
          <p>
            <a href="#">Add to Calendar</a> | <a href="#">Cancel Booking</a>
          </p>
        </div>
        <div class="content">
          <div class="info">
            <div class="details">
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
                  alt="User Icon"
                  width="24"
                  height="24"
                />
                <span>${data.fullName}</span>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/calendar.png"
                  alt="Calendar Icon"
                  width="24"
                  height="24"
                />
                <span>${data.resDate}</span>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/clock.png"
                  alt="Clock Icon"
                  width="24"
                  height="24"
                />
                <span>${data.resTime}</span>
              </div>
            </div>
            <div class="confirmed">
              <img
                src="https://img.icons8.com/?size=100&id=63312&format=png&color=000000"
                alt="Confirmed Icon"
              />
              <span>Confirmed</span><br />
              <span>${data.id}</span>
            </div>
          </div>
          <p>
            Your table is booked till ${newResTime}. Tables are kept for 15 min after
            reservation time. For more information please call us on +441592261635
            or email
            <a href="mailto:vuthuylinh23082002@gmail.com">vuthuylinh23082002@gmail.com</a>
          </p>
          <p>
            Should your plans change, please let us know. We look forward to
            serving you.
          </p>
        </div>
        <div class="footer">
          <p>Have a nice day.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  });
};

const notifyOrderCanceled = async (data) => {
  return await transporter.sendMail({
    from: '"VŨ THÙY LINH" <vuthuylinh23082002@gmail.com>',
    to: `${data.email}`,
    subject: "RESERVATION CANCELED",
    text: "Reservation Canceled",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reservation Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .header {
          text-align: center;
          border-bottom: 1px solid #ddd;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          color: #333;
        }
        .header p {
          margin: 5px 0;
          font-size: 14px;
          color: #666;
        }
        .header a {
          color: #007bff;
          text-decoration: none;
        }
        .content {
          padding: 20px  0;
        }
        .info {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .details {
          display: flex;
          flex-direction: column;
        }
          .details div {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
        .details img {
          margin-right: 10px;
        }
        .confirmed {
          text-align: center;
          color: rgb(176, 53, 53;
          flex-shrink: 0;
        }
        .confirmed img {
          display: block;
          margin: 0 auto 5px;
          width: 72px;
          height: 72px;
        }
        .footer {
          border-top: 1px solid #ddd;
          padding-top: 20px;
          text-align: center;
          font-size: 14px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>LEE HOT POT</h1>
          <p>19, Nguyen An Ninh, Hoang Mai, Ha Noi, +441592261635</p>
          <p>
            <a href="https://www.facebook.com/weareoneEXO">www.facebook.com/weareoneEXO</a>
          </p>
          <p>
            <a href="#">Add to Calendar</a> | <a href="#">Cancel Booking</a>
          </p>
        </div>
        <div class="content">
          <div class="info">
            <div class="details">
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
                  alt="User Icon"
                  width="24"
                  height="24"
                />
                <span>${data.fullName}</span>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/calendar.png"
                  alt="Calendar Icon"
                  width="24"
                  height="24"
                />
                <span>${data.resDate}</span>
              </div>
              <div>
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/clock.png"
                  alt="Clock Icon"
                  width="24"
                  height="24"
                />
                <span>${data.resTime}</span>
              </div>
            </div>
            <div class="confirmed">
              <img
              src="https://img.icons8.com/?size=100&id=WlUYL50DQGDm&format=png&color=000000"
              alt="Canceled Icon"
            />
              <span>Canceled</span><br />
              <span>${data.id}</span>
            </div>
          </div>
          <p>
            We are sorry to see you go and hope to see you soon. Please feel free
          to visit
            <a href="mailto:vuthuylinh23082002@gmail.com">vuthuylinh23082002@gmail.com</a>
            and book a table at Lee Hotpot Restaurant for another date.
          </p>

        </div>
        <div class="footer">
          <p>Have a nice day.</p>
        </div>
      </div>
    </body>
    </html>
    `,
  });
};

module.exports = {
  notifyOrderPlaceSuccess,
  notifyOrderCanceled,
};
