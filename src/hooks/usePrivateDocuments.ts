import { useState } from 'react';
import { Document } from '../types/document';

const initialDocuments: Document[] = [
  {
    id: '1',
    title: '重要會議記錄',
    date: '2024-03-20',
    isEncrypted: false
  },
  {
    id: '2',
    title: '人事異動提案',
    date: '2024-03-19',
    isEncrypted: false
  }
];

export function usePrivateDocuments() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);

  const encryptDocument = (id: string, password: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id 
          ? { ...doc, isEncrypted: true, password } 
          : doc
      )
    );
  };

  return {
    documents,
    encryptDocument
  };
}