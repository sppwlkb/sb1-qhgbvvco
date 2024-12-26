import { getApps, initializeApp } from 'firebase/app';
import { env } from '../../config/environment';

// Initialize Firebase with validated environment variables
export const app = !getApps().length ? initializeApp(env.firebase) : getApps()[0];