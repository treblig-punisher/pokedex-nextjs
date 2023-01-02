import '../styles/globals.css'
import {Analytics} from '@vercel/analytics/react'
function MyApp({ Component, pageProps }) {
  return(
    <>
       <Component {...pageProps} />
       <Analytics
          beforeSend={(event) => {
            // Ignore all events that have a `/private` inside the URL
            if (event.url.includes('/private')) {
              return null;
            }
            return event;
          }}
       />
    </>
  )
}

export default MyApp
