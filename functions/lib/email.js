const { gmail, EMAIL_USER } = require("./config");

/**
 * Create a MIME message for Gmail API
 */
const createMimeMessage = (to, from, subject, html) => {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    html,
  ];
  const message = messageParts.join("\r\n");
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

/**
 * sendEmail via Gmail API
 */
const sendEmail = async (to, subject, html) => {
  const raw = createMimeMessage(to, `dbcolors <${EMAIL_USER}>`, subject, html);
  return gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
};

/**
 * sendConfirmationEmail
 */
const sendConfirmationEmail = async (to, bookingDetails) => {
  const { package, date, time, hangoutLink, name } = bookingDetails;
  const primaryColor = "#99ff00";
  const secondaryColor = "#0A0A0A";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="background-color: #050505; margin: 0; padding: 40px 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: ${secondaryColor}; border: 1px solid rgba(153, 255, 0, 0.1); border-radius: 24px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 40px 40px 20px 40px;">
              <p style="color: ${primaryColor}; font-weight: 900; text-transform: uppercase; letter-spacing: 0.4em; font-size: 10px; margin: 0 0 10px 0;">Booking Confirmed</p>
              <h1 style="color: #ffffff; font-size: 32px; font-weight: 900; margin: 0; letter-spacing: -0.05em;">Dignified Brand Colors</h1>
            </td>
          </tr>

          <!-- Confirmation Hero -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; text-align: center;">
              <div style="background: rgba(153, 255, 0, 0.05); border: 1px solid rgba(153, 255, 0, 0.1); padding: 30px; border-radius: 20px; margin-bottom: 30px;">
                <p style="color: #ffffff; font-size: 18px; margin: 0 0 10px 0; font-weight: 700;">Hello ${name || "there"},</p>
                <p style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin: 0; line-height: 1.6;">Your <strong>${package}</strong> consultation is officially on the calendar. We're excited to help you transform your space!</p>
              </div>

              <!-- Details Stack -->
              <div style="margin-top: 20px;">
                <div style="display: inline-block; min-width: 120px; padding: 15px; margin: 5px; text-align: center; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: rgba(255, 255, 255, 0.3); font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 5px 0;">Date</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0;">${date}</p>
                </div>
                <div style="display: inline-block; min-width: 120px; padding: 15px; margin: 5px; text-align: center; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: rgba(255, 255, 255, 0.3); font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 5px 0;">Time</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0;">${time}</p>
                </div>
                <div style="display: inline-block; min-width: 120px; padding: 15px; margin: 5px; text-align: center; background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                  <p style="color: rgba(255, 255, 255, 0.3); font-size: 8px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 5px 0;">Zone</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 700; margin: 0;">WAT (GMT+1)</p>
                </div>
              </div>

              <div style="margin-top: 30px; text-align: center;">
                <p style="color: rgba(255, 255, 255, 0.3); font-size: 11px; font-style: italic; margin: 0;">The meeting link has been added to the calendar invitation sent separately.</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <footer style="background-color: rgba(255, 255, 255, 0.02); padding: 30px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05);">
            <p style="color: rgba(255, 255, 255, 0.2); font-size: 11px; margin: 0 0 10px 0;">This is an automated confirmation from Dignified Brand Colors.</p>
            <p style="color: rgba(255, 255, 255, 0.1); font-size: 9px; margin: 0;">&copy; 2026 Dignified Brand Colors. All rights reserved.</p>
          </footer>
        </table>
      </body>
    </html>
  `;

  return sendEmail(to, `Consultation Confirmed: ${package}`, htmlBody);
};

/**
 * sendAdminNotificationEmail
 */
const sendAdminNotificationEmail = async (to, bookingDetails) => {
  const { package, date, time, hangoutLink, email, name, preferences, assets } = bookingDetails;
  const primaryColor = "#99ff00";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
      <body style="background-color: #050505; font-family: sans-serif; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background: #0A0A0A; border: 1px solid rgba(153, 255, 0, 0.1); border-radius: 20px; overflow: hidden; color: #fff;">
          <div style="padding: 40px;">
            <p style="color: ${primaryColor}; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; font-size: 10px;">New Booking Alert</p>
            <h2 style="font-size: 28px; font-weight: 900; margin: 10px 0 30px 0; letter-spacing: -0.05em;">${name || "A new client"} booked a session</h2>

            <table width="100%" style="background: rgba(255, 255, 255, 0.03); border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 12px;">Client</td><td style="padding: 8px 0; color: #fff; font-size: 12px; font-weight: bold;">${name || "N/A"} (${email})</td></tr>
              <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 12px;">Package</td><td style="padding: 8px 0; color: #fff; font-size: 12px; font-weight: bold;">${package}</td></tr>
              <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 12px;">Date</td><td style="padding: 8px 0; color: #fff; font-size: 12px; font-weight: bold;">${date}</td></tr>
              <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 12px;">Time</td><td style="padding: 8px 0; color: #fff; font-size: 12px; font-weight: bold;">${time}</td></tr>
              <tr><td style="padding: 8px 0; color: rgba(255,255,255,0.4); font-size: 12px;">Meet Link</td><td style="padding: 8px 0;"><a href="${hangoutLink || '#'}" style="color: ${primaryColor}; font-size: 12px; font-weight: bold;">${hangoutLink || 'Not generated'}</a></td></tr>
            </table>

            ${preferences ? `
            <div style="margin-bottom: 30px; padding: 20px; border-left: 4px solid ${primaryColor}; background: rgba(255, 255, 255, 0.02);">
              <p style="margin: 0 0 10px 0; color: rgba(255,255,255,0.4); font-size: 9px; font-weight: bold; text-transform: uppercase;">Design Preferences</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #eee;">${preferences}</p>
            </div>
            ` : ""}

            ${assets && (assets.photos?.length || assets.drawing || assets.layout) ? `
            <div>
              <p style="margin: 0 0 10px 0; color: rgba(255,255,255,0.4); font-size: 9px; font-weight: bold; text-transform: uppercase;">Project Assets</p>
              <div style="background: rgba(255, 255, 255, 0.02); padding: 20px; border-radius: 12px;">
                <ul style="margin: 0; padding: 0; list-style: none;">
                  ${assets.photos?.map((url, idx) => `<li style="margin-bottom: 8px;"><a href="${url}" style="color: ${primaryColor}; text-decoration: none; font-size: 12px; font-weight: 700;">→ Photo ${idx + 1}</a></li>`).join('') || ""}
                  ${assets.drawing ? `<li style="margin-bottom: 8px;"><a href="${assets.drawing}" style="color: ${primaryColor}; text-decoration: none; font-size: 12px; font-weight: 700;">→ Technical Drawing</a></li>` : ""}
                  ${assets.layout ? `<li style="margin-bottom: 8px;"><a href="${assets.layout}" style="color: ${primaryColor}; text-decoration: none; font-size: 12px; font-weight: 700;">→ Room Layout</a></li>` : ""}
                </ul>
              </div>
            </div>
            ` : ""}
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail(to, `[NEW BOOKING] ${package} - ${email}`, htmlBody);
};

module.exports = {
  sendConfirmationEmail,
  sendAdminNotificationEmail
};
