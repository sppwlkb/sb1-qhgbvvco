// Environment configuration with validation
export const env = {
  firebase: {
    apiKey: "AlzaSyBcgsqeTWQ-0vJ0mMlHpr3GXsv9BW5c5qM",
    authDomain: "lihsi-reporting-system-444405.firebaseapp.com", 
    projectId: "lihsi-reporting-system-444405",
    storageBucket: "lihsi-reporting-system-444405.appspot.com",
    messagingSenderId: "869939300945",
    appId: "1:869939300945:web:BEJE85zC-6kxm_gkhtyzhWyFxNGOxqeylCYdb-JsuqMWuDC0mvaT9Ra3th2",
    measurementId: "G-ceHvzmQX99DsmTKQKPUCMlnpTJE"
  },
  supabase: {
    url: 'https://xinbdxtyaqjomyubrjwc.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbmJkeHR5YXFqb215dWJyandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2OTk4NDAsImV4cCI6MjA1MDI3NTg0MH0.uJGm3d1mmmCJIYdWdDW4cE6BJlhebQ5z5d-ir4EjLes'
  }
};

// Validate required environment variables
const validateEnv = () => {
  const required = {
    // Firebase
    'FIREBASE_API_KEY': env.firebase.apiKey,
    'FIREBASE_AUTH_DOMAIN': env.firebase.authDomain,
    'FIREBASE_PROJECT_ID': env.firebase.projectId,
    'FIREBASE_STORAGE_BUCKET': env.firebase.storageBucket,
    'FIREBASE_MESSAGING_SENDER_ID': env.firebase.messagingSenderId,
    'FIREBASE_APP_ID': env.firebase.appId,
    // Supabase
    'SUPABASE_URL': env.supabase.url,
    'SUPABASE_KEY': env.supabase.key
  };

  const missing = Object.entries(required)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
};

validateEnv();