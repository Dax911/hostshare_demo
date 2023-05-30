import { getAuth, withClerkMiddleware } from '@clerk/nextjs/server'
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse, userAgent } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/', '/sign-in*', '/sign-up*', '/api/trpc/example*']
const featuresPaths = ['/features', '/docs', '/blog']


const isPublic = (path: string) => {
  return publicPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/|\\.)'))),
  )
}

const isFeatures = (path: string) => {
  return featuresPaths.find((x) =>
    path.match(new RegExp(`^${x}$`.replace('*$', '($|/|\\.)'))),
  )
}

export default withClerkMiddleware(async (request: NextRequest) => {
  const userLat = request.geo?.latitude
  const userLong = request.geo?.longitude
  const userCity = request.geo?.city

  try {
      // Call the Geolocation API
      const geoResponse = await fetch(`https://ipwhois.app/json/${clientIp}`);
      const geoData = await geoResponse.json();

      if (geoData.latitude && geoData.longitude) {
          req.geoLocation = {
              latitude: geoData.latitude,
              longitude: geoData.longitude
          };
      }
  } catch (err) {
      console.error(err);
  }

  if (isPublic(request.nextUrl.pathname)) {
    return NextResponse.next()
  }
  // if the user is not signed in redirect them to the sign in page.
  const { userId } = getAuth(request)


  if (!userId) {
    // redirect the users to /pages/sign-in/[[...index]].ts
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set('redirect_url', request.url)
    return NextResponse.redirect(signInUrl)
  }

  const { nextUrl: url, geo } = request;

  const country = geo?.country || 'US';
  const lat = geo?.latitude || '29.424122';
  const long = geo?.longitude || '-98.493629';

  const cookies = new ResponseCookies(new Headers())
  cookies.set('lat', `${lat}`, { maxAge: 1000 })
  cookies.set('long', `${long}`, { maxAge: 1000 })
  cookies.set('country', `${country}`, { maxAge: 1000 })


  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  url.searchParams.set('viewport', viewport);

  return NextResponse.rewrite(url);

})

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    '/(.*?trpc.*?|(?!static|.*\\..*|_next|favicon.ico).*)',
    '/',
  ],
}
