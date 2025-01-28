# Antrean Ticket Printer

A simple Node.js application to print queue numbers using a thermal printer. The application communicates with a server through **Socket.IO** and listens for print commands to generate and print queue tickets.

## Features

- Real-time connection with the server using **Socket.IO**.
- Generate queue ticket screenshots dynamically.
- Print queue tickets with a thermal printer using **ESC/POS** commands.

---

## Installation

### Prerequisites

- Node.js (v14 or later) i used 23.5.0
- A compatible thermal printer (and the necessary drivers, in windows, use zadig to install the driver) for more information visit [node-escpos](https://www.npmjs.com/package/escpos)
- Socket.IO server running

### Clone the Repository

```bash
git clone https://github.com/masqomar21/antrean-ticket-printer.git
cd antrean-ticket-printer
```

### Install Dependencies

```bash
npm install
```

---

## Configuration

Edit the `.env` file to set up the server connection and event topics:

```javascript
SOCKET_URL="http://localhost:3000"

# event topics:
TOPIC_PRINT_NOMOR_ANTREAN=print_nomor_antrean
TOPIC_STATUS=status
```

- `SOCKET_URL`: The URL of the Socket.IO server.
- `TOPIC_PRINT_NOMOR_ANTREAN`: The topic to listen for print commands.
- `TOPIC_STATUS`: The topic to emit status updates.

You can also edit the `config.js` file to set up the printer configuration:

```javascript
const baseConfig = {
  web_url: process.env.WEB_URL,
  socket: {
    url: process.env.SOCKET_URL || "http://localhost:3000",
    topik: {
      printNomorAntrean:
        process.env.TOPIC_PRINT_NOMOR_ANTREAN || "print_nomor_antrean",
      status: process.env.TOPIC_STATUS || "status",
    },
  },
};
```

- `web_url`: The URL of the web page to generate the ticket screenshot.
- `socket.url`: The URL of the Socket.IO server.
- `socket.topik.printNomorAntrean`: The topic to listen for print commands.
- `socket.topik.status`: The topic to emit status updates.

---

## Usage

Start the application:

```bash
node index.js
```

or

just run the `run.bat` file

The application will:

1. Connect to the Socket.IO server.
2. Listen for the `queue-print-ticket` event.
3. Generate a ticket screenshot.
4. Print the ticket using the thermal printer.
5. clean up the temporary file

---

## Project Structure

```
antrean-ticket-printer/
├── images/
│   ├── logo.png             # logo for the ticket
├── node_modules/            # Dependensi proyek
├── services/
│   ├── cleanUpFTemp.js      # cleaning temp file
│   ├── genFile.js           # generating file
│   ├── printEscpos.js       # printing logic
├── temp/                    # temporary file
├── View/
│   ├── index.html           # html template to generate ticket
├── .env                     # Environment variables
├── config.js                # configuration file for the application / can use .env
├── index.js                 # Main application file
├── package.json             # dependencies and scripts
├── run.bat                  # run the application

```

---

## Dependencies

- **[Socket.IO Client](https://www.npmjs.com/package/socket.io-client)**: For real-time server communication.
- **[puppeteer](https://pptr.dev/)**: For generating screenshots.
- **[sharp](https://www.npmjs.com/package/sharp)**: For image processing.
- **[escpos](https://www.npmjs.com/package/escpos)**: For sending print commands to the thermal printer.
- **[escpos-usb](https://www.npmjs.com/package/escpos-usb)**: For sending print commands to the thermal printer.
- **[usb](https://www.npmjs.com/package/usb/v/1.8.8)**: For sending print commands to the thermal printer.
- **[dotenv](https://www.npmjs.com/package/dotenv)** : For environment variables

---

## Example Workflow

1. Server emits a `queue-print-ticket` event or other event has been set in the configuration, with the following data:
   ```json
   {
     "instansi": "Dinas Kesehatan",
     "layanan": "Pendaftaran",
     "nomor_antrean": "A001",
     "tanggal": "2021-08-01",
     "jam": "08:00",
     "loket": "1"
   }
   ```
2. The application:
   - Generates a screenshot using Puppeteer.
   - Sends the ticket to the thermal printer via ESC/POS.
   - Emits a `status` event back to the server indicating the ticket has been printed.

---

## Contribution

Feel free to fork the repository and submit a pull request to contribute! 😊
