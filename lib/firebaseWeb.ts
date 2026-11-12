// The YesCoach Firebase web config: public identifiers, the same ones the app ships
// (YesCoachReact src/config/firebase-config.json). Access is enforced by the API's
// token check and admin allowlist, never by keeping these secret.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAoTDaF4WPl8n5XXcBgRweEGGpOa_5O_Us',
  authDomain: 'yescoach-e7c86.firebaseapp.com',
  projectId: 'yescoach-e7c86',
  appId: '1:828887599540:web:60307925559e893b07cae1',
}

export const auth = getAuth(initializeApp(config))
