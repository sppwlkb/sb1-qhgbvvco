export interface Document {
  id: string;
  title: string;
  date: string;
  isEncrypted: boolean;
  password?: string;
}