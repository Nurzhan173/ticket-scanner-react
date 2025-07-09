import { useRef, useEffect, useState } from 'react'
import QrScanner from 'qr-scanner'

const QRScanner = ({ onScanResult, onClose }) => {
  const videoRef = useRef(null)
  const qrScannerRef = useRef(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    const startScanner = async () => {
      try {
        setIsLoading(true)
        setError(null)
        setDebugInfo('Checking camera availability...')

        // Check if we're on HTTPS or localhost
        const isSecureContext = window.isSecureContext || 
                               window.location.hostname === 'localhost' || 
                               window.location.hostname === '127.0.0.1' ||
                               window.location.protocol === 'file:'
        if (!isSecureContext) {
          setError('Camera access requires HTTPS or localhost. Please use https:// or run on localhost.')
          setIsLoading(false)
          return
        }

        setDebugInfo('Checking if camera is available...')
        
        // Check if camera is available
        const hasCamera = await QrScanner.hasCamera()
        if (!hasCamera) {
          setError('No camera found. Please make sure you have a camera connected and try refreshing the page.')
          setIsLoading(false)
          return
        }

        setDebugInfo('Camera found! Requesting permissions...')

        // Wait a bit for the video element to be ready
        await new Promise(resolve => setTimeout(resolve, 100))

        // Ensure video element is properly set up
        if (videoRef.current) {
          videoRef.current.muted = true
          videoRef.current.playsInline = true
          videoRef.current.autoplay = false // Disable autoplay initially
        }

        setDebugInfo('Creating QR scanner...')

        // Create QR scanner instance
        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            console.log('QR Code detected:', result.data)
            onScanResult(result.data)
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: 'environment', // Use back camera if available
            maxScansPerSecond: 5 // Limit scan frequency
          }
        )

        setDebugInfo('Starting camera stream...')
        
        // Start scanning with error handling
        await qrScannerRef.current.start()
        
        // Ensure video plays after scanner starts
        if (videoRef.current) {
          try {
            await videoRef.current.play()
          } catch (playError) {
            console.log('Video play error (this is often normal):', playError)
            // Don't throw error here as the scanner might still work
          }
        }
        
        setDebugInfo('')
        setIsLoading(false)
      } catch (err) {
        console.error('Error starting QR scanner:', err)
        
        // Provide specific error messages based on the error
        if (err.name === 'NotAllowedError') {
          setError('Camera access denied. Please allow camera access in your browser settings and refresh the page.')
        } else if (err.name === 'NotFoundError') {
          setError('No camera found. Please connect a camera and try again.')
        } else if (err.name === 'NotReadableError') {
          setError('Camera is already in use by another application. Please close other apps using the camera.')
        } else if (err.name === 'OverconstrainedError') {
          setError('Camera constraints could not be satisfied. Try using a different camera.')
        } else if (err.message && err.message.includes('play()')) {
          setError('Video playback issue. Please refresh the page and try again.')
        } else {
          setError(`Failed to start camera: ${err.message || 'Unknown error'}. Please try refreshing the page.`)
        }
        setIsLoading(false)
      }
    }

    // Small delay to ensure component is mounted
    const timer = setTimeout(startScanner, 200)

    // Cleanup function
    return () => {
      clearTimeout(timer)
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy()
        qrScannerRef.current = null
      }
    }
  }, [onScanResult])

  const handleRetry = async () => {
    setError(null)
    setIsLoading(true)
    setDebugInfo('Retrying with fallback method...')
    
    // Clean up any existing scanner
    if (qrScannerRef.current) {
      qrScannerRef.current.destroy()
      qrScannerRef.current = null
    }

    // Try a different approach - request camera permission first
    try {
      setDebugInfo('Requesting camera permission...')
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      // Stop the test stream immediately
      stream.getTracks().forEach(track => track.stop())
      setDebugInfo('Permission granted! Reinitializing...')
      
      // Wait a moment then restart
      setTimeout(() => {
        // This will trigger the useEffect to restart
        window.location.reload()
      }, 1000)
      
    } catch (err) {
      console.error('Fallback permission request failed:', err)
      setError('Camera permission required. Please allow camera access and try again.')
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <div className="qr-scanner-error">
        <div className="error-icon">📷❌</div>
        <p>{error}</p>
        <div className="error-tips">
          <h4>💡 Quick fixes:</h4>
          <ul>
            <li>✅ Allow camera access when prompted</li>
            <li>🔄 Refresh the page</li>
            <li>📱 Close other apps using the camera</li>
            <li>🌐 Try a different browser (Chrome recommended)</li>
          </ul>
        </div>
        <div className="error-actions">
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="qr-scanner-container">
      {isLoading && (
        <div className="scanner-loading">
          <div className="loading-spinner"></div>
          <p>Starting camera...</p>
          {debugInfo && <p className="debug-info">{debugInfo}</p>}
        </div>
      )}
      <video
        ref={videoRef}
        className={`qr-video ${isLoading ? 'loading' : ''}`}
        playsInline
        muted
        controls={false}
        style={{ objectFit: 'cover' }}
      />
      <div className="scanner-overlay">
        <div className="scanner-frame">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>
        <p className="scanner-instruction">
          Position the QR code within the frame
        </p>
      </div>
    </div>
  )
}

export default QRScanner 