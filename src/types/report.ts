export interface Report {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
  reporter: {
    id: string;
    name: string;
  };
  assignee: {
    id: string;
    name: string;
  };
  comments?: {
    id: string;
    content: string;
    created_at: string;
    user: {
      id: string;
      name: string;
    };
  }[];
}