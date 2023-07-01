import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// const serviceAccount = require('./firebaseSecretKey.json')
// export const firebaseAdmin =
//   getApps()[0] ??
//   initializeApp({
//     credential: cert(serviceAccount)
//   })
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')!
}
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount)
  })

export const adminAuth = getAuth(firebaseAdmin)
