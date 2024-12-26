import { getFirestore, collection, doc, query, where, orderBy } from 'firebase/firestore';
import { app } from './config';

export const db = getFirestore(app);

// Collection references
export const collections = {
  reports: collection(db, 'reports'),
  announcements: collection(db, 'announcements'),
  notifications: collection(db, 'notifications'),
  users: collection(db, 'users')
} as const;

// Query builders
export const createQuery = (collectionName: keyof typeof collections, ...queryConstraints: any[]) => {
  return query(collections[collectionName], ...queryConstraints);
};

export const getDocRef = (collectionName: keyof typeof collections, docId: string) => {
  return doc(collections[collectionName], docId);
};