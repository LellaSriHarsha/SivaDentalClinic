# Appointment form and Google reviews

## What will change
- Make the appointment request more prominent and format the WhatsApp message with relevant emojis, bold labels, and a clear confirmation note.
- Keep full name and phone number mandatory, with clearer required markers and validation.
- Replace broad morning/afternoon/evening choices with specific 30-minute appointment slots from 9:00 AM to 10:30 PM.
- Add server-side repeat-request protection: allow up to three prepared requests per hour from the same phone number or network address, then show a clear wait-and-call message.
- Add a Google Reviews section using verified public listing data: 5.0 rating, 77 reviews, and three attributed review excerpts with links to Google.

## Privacy and safety
- Appointment details will still not be saved.
- Repeat-request protection will store only one-way anonymous fingerprints of the phone number and network address, plus request time; it will not store names, phone numbers, messages, or treatment details.
- Validation will run both in the browser and on the server before a WhatsApp link is prepared.

## Technical details
- Add a locked Cloud table and atomic limiter function accessible only to trusted server code.
- Add a same-site appointment validation endpoint with strict body limits and origin checks.
- Preserve WhatsApp-only delivery: the clinic receives the request only after the patient taps Send in WhatsApp.
- Verify desktop and mobile layouts, required-field errors, valid submission, and throttling behavior.
