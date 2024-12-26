export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  department: string;
  attachments?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastContact: Date;
}