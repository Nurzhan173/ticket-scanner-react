import { useState } from 'react'
import QRScanner from './components/QRScanner'
import './App.css'

function App() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedResult, setScannedResult] = useState(null)

  const startScanning = () => {
    setIsScanning(true)
    setScannedResult(null)
  }

  const stopScanning = () => {
    setIsScanning(false)
  }

  const handleScanResult = (result) => {
    setScannedResult(result)
    setIsScanning(false)
  }

  const resetApp = () => {
    setIsScanning(false)
    setScannedResult(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎫 Ticket Scanner</h1>
        <p>Scan QR codes to get ticket information</p>
      </header>

      <main className="app-main">
        {!isScanning && !scannedResult && (
          <div className="scan-section">
            <button className="scan-button" onClick={startScanning}>
              📱 Scan QR Code
            </button>
          </div>
        )}

        {isScanning && (
          <div className="scanner-section">
            <h2>Point your camera at the QR code</h2>
            <QRScanner 
              onScanResult={handleScanResult}
              onClose={stopScanning}
            />
            <button className="cancel-button" onClick={stopScanning}>
              Cancel
            </button>
          </div>
        )}

        {scannedResult && (
          <div className="results-section">
            <h2>✅ QR Code Scanned Successfully!</h2>
            <div className="result-card">
              <h3>Scanned Information:</h3>
              <div className="result-content">
                <pre>{scannedResult}</pre>
              </div>
              <div className="result-actions">
                <button className="scan-again-button" onClick={resetApp}>
                  Scan Another QR Code
                </button>
                <button className="copy-button" onClick={() => navigator.clipboard.writeText(scannedResult)}>
                  Copy to Clipboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
