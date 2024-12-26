import { collection } from 'firebase/firestore';
import { db } from './db';

// Collection references
export const reportsRef = collection(db, 'reports');
export const announcementsRef = collection(db, 'announcements');
export const notificationsRef = collection(db, 'notifications');
export const usersRef = collection(db, 'users');

// Collection names
export const collections = {
  reports: 'reports',
  announcements: 'announcements',
  notifications: 'notifications',
  users: 'users'
} as const;

export type CollectionName = keyof typeof collections;
export type CollectionPath = typeof collections[CollectionName];