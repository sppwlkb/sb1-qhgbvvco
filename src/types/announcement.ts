export interface ImportantAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: {
    id: string;
    name: string;
  };
  priority: 'high' | 'medium' | 'low';
}