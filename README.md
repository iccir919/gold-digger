# Gold Digger 💰

A real-time gold investment tracking application that allows users to simulate gold purchases based on live price updates. Built with vanilla Node.js (no frameworks!) using Server-Sent Events (SSE) for real-time price streaming.

## Features

- **Live Gold Price Updates**: Real-time gold price streaming using Server-Sent Events (SSE)
- **Investment Tracking**: Record and store gold investments with timestamp, amount paid, and quantity purchased
- **Automatic Calculations**: Automatically calculates troy ounces (ozt) of gold based on current price
- **Clean UI**: Simple, intuitive interface showing connection status and live prices
- **Data Persistence**: All investments are saved to a local JSON file
- **Custom Static File Server**: Built-in static file serving without external dependencies

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended for ES modules support)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iccir919/gold-digger.git
   cd gold-digger
   ```

2. Install dependencies (if any):
   ```bash
   npm install
   ```

3. Ensure you have a `data` directory with a `data.json` file:
   ```bash
   mkdir -p data
   echo "[]" > data/data.json
   ```

## Usage

Start the server:

```bash
node server.js
```

The application will be available at `http://localhost:8000`

### Making an Investment

1. Open the application in your browser
2. Wait for the live gold price to connect (indicated by 🟢)
3. Enter the amount you want to invest in GBP (£)
4. Click the "Invest" button
5. View your investment summary showing how many troy ounces you purchased

## Project Structure

```
gold-digger/
├── data/
│   └── data.json              # Stores investment records
├── handlers/
│   └── routeHandlers.js       # Request handlers for POST and SSE endpoints
├── public/
│   ├── index.html             # Main UI
│   ├── index.js               # Client-side JavaScript
│   ├── styles.css             # Styling
│   └── 404.html               # Error page
├── utils/
│   ├── addNewInvestment.js    # Adds new investments to data.json
│   ├── getData.js             # Reads investment data
│   ├── getPrice.js            # Generates/fetches gold prices
│   ├── sendResponse.js        # HTTP response helper
│   ├── serveStatic.js         # Static file server
│   └── getContentType.js      # MIME type helper
├── server.js                  # Main server entry point
└── package.json               # Project configuration
```

## API Documentation

### Endpoints

#### `GET /`
Serves the main application interface.

#### `GET /price/live`
Server-Sent Events (SSE) endpoint that streams live gold price updates.

**Response Format:**
```javascript
data: {
  "event": "price-update",
  "price": 2043.50
}
```

Price updates are sent every 3 seconds.

#### `POST /invest`
Records a new gold investment.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "timestamp": "2024-12-12T10:30:00.000Z",
  "amount paid": 1000,
  "gold price": 2043.50,
  "gold sold": "0.489"
}
```

**Response (201 Created):**
```json
{
  "timestamp": "2024-12-12T10:30:00.000Z",
  "amount paid": 1000,
  "gold price": 2043.50,
  "gold sold": "0.489"
}
```

## Technical Highlights

### Server-Sent Events (SSE)
The application uses SSE for real-time price updates, providing a lightweight alternative to WebSockets for one-way data streaming from server to client.

### No Framework Approach
Built entirely with Node.js's native `http` module, demonstrating:
- Custom routing
- Static file serving
- JSON body parsing
- File system operations
- ES6 module syntax

### Data Storage
Investment data is persisted in a JSON file (`data/data.json`) with the following structure:

```json
[
  {
    "timestamp": "2024-12-12T10:30:00.000Z",
    "amount paid": 1000,
    "gold price": 2043.50,
    "gold sold": "0.489"
  }
]
```

## Technologies

- **Runtime:** Node.js (ES Modules)
- **Server:** Native Node.js HTTP module
- **Real-time Communication:** Server-Sent Events (SSE)
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Data Storage:** JSON file system

## Configuration

The server runs on port 8000 by default. To change this, modify the `PORT` constant in `server.js`:

```javascript
const PORT = 8000  // Change to your desired port
```

## Development Notes

### Adding New Routes
Add new route handlers in `handlers/routeHandlers.js` and register them in `server.js`:

```javascript
if (req.url === "/your-route") {
  await yourHandler(req, res)
}
```

### Modifying Price Updates
The gold price update logic is in `utils/getPrice.js`. Currently it generates simulated prices, but you could integrate a real gold price API here.

### Customizing the UI
All frontend assets are in the `public/` directory:
- `index.html` - Structure
- `styles.css` - Styling
- `index.js` - Client-side logic

## Future Enhancements

Potential features to add:
- Real gold price API integration
- User authentication
- Investment portfolio analytics
- Historical price charts
- Export investment data (CSV/PDF)
- Multiple currency support

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Neil - [@iccir919](https://github.com/iccir919)

Project Link: [https://github.com/iccir919/gold-digger](https://github.com/iccir919/gold-digger)

## Acknowledgments

- Built as a demonstration of vanilla Node.js capabilities
- No external frameworks or libraries required (except for any dev dependencies)
