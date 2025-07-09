# 🎫 Ticket Scanner React

A modern React application for scanning QR codes to retrieve ticket information. Built with Vite for fast development and optimized performance.

## ✨ Features

- **📱 QR Code Scanning**: Use your device's camera to scan QR codes
- **🎯 Real-time Detection**: Instant QR code recognition with visual feedback
- **📋 Results Display**: Clear presentation of scanned QR code data
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🎨 Modern UI**: Beautiful gradient design with smooth animations
- **📄 Copy Support**: One-click copying of scanned results

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager
- A device with a camera (for QR scanning)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd ticket-scanner-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎯 How to Use

1. **Launch the Application**: Open the app in your web browser
2. **Allow Camera Access**: Click "Scan QR Code" and grant camera permissions when prompted
3. **Scan QR Code**: Point your camera at a QR code within the scanning frame
4. **View Results**: The scanned information will be displayed automatically
5. **Copy or Scan Again**: Use the buttons to copy results or scan another QR code

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **qr-scanner**: Lightweight QR code scanning library
- **CSS3**: Modern styling with gradients and animations

## 📱 Browser Support

This application works best on:
- Chrome/Chromium browsers (recommended)
- Firefox
- Safari (iOS and macOS)
- Edge

**Note**: Camera access requires HTTPS in production environments.

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Project Structure

```
src/
├── components/
│   └── QRScanner.jsx    # QR scanning component
├── App.jsx              # Main application component
├── App.css              # Application styles
├── main.jsx             # React entry point
└── index.css            # Global styles
```

## 🎨 Customization

### Styling
The application uses CSS custom properties and modern styling. You can customize:
- Color scheme in `App.css`
- Scanner frame appearance
- Button styles and animations

### Scanner Configuration
Modify the QR scanner settings in `QRScanner.jsx`:
- `preferredCamera`: Choose front or back camera
- `highlightScanRegion`: Toggle scan region highlighting
- `highlightCodeOutline`: Toggle detected code outline

## 🔒 Security & Privacy

- Camera access is only used for QR scanning
- No data is transmitted to external servers
- All processing happens locally in your browser
- Scanned data is only stored temporarily in browser memory

## 🐛 Troubleshooting

### Camera Not Working
- Ensure camera permissions are granted
- Check if camera is being used by another application
- Try refreshing the page
- Ensure you're using HTTPS in production

### QR Code Not Detected
- Ensure good lighting conditions
- Hold the camera steady
- Make sure the QR code is clear and not damaged
- Try adjusting the distance from the QR code

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---

**Happy Scanning! 🎫📱**
