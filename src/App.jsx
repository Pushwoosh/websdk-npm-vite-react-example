import { useEffect, useState } from 'react'
import pushwooshLogo from './assets/pushwoosh.svg'
import './App.css'
import { usePushwoosh } from './usePushwoosh.js'

function App() {
  const [isSubscribed, setIsSubscribed] = useState(null)
  const Pushwoosh = usePushwoosh()

  useEffect(() => {
    const checkSubscription = async () => {
      setIsSubscribed(await Pushwoosh.isSubscribed())
    }
    Pushwoosh.addEventHandler('ready', checkSubscription)
    Pushwoosh.addEventHandler('subscribe', checkSubscription)
    Pushwoosh.addEventHandler('unsubscribe', checkSubscription)
    checkSubscription()
    return () => {
      Pushwoosh.removeEventHandler('ready', checkSubscription)
      Pushwoosh.removeEventHandler('subscribe', checkSubscription)
      Pushwoosh.removeEventHandler('unsubscribe', checkSubscription)
    }
  }, [Pushwoosh])

  return (
    <>
      <div>
        <a href="https://www.pushwoosh.com" target="_blank">
          <img src={pushwooshLogo} className="logo" alt="Pushwoosh logo" />
        </a>
      </div>
      <h1>Pushwoosh Web SDK Example</h1>
      <div className="card">
        <p>
          Subscription status: {isSubscribed === null ? 'Checking...' : isSubscribed ? 'Subscribed' : 'Not subscribed'}
        </p>
        {!isSubscribed && (
          <div id="pw-subscribe-widget-container">
            <p>Click the button below to subscribe:</p>
            <button onClick={() => Pushwoosh.subscribe()}>Subscribe</button>
          </div>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Pushwoosh logo to learn more about the Pushwoosh Web SDK.
      </p>
    </>
  )
}

export default App
