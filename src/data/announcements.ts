import { ImportantAnnouncement } from '../types/announcement';

export const announcements: ImportantAnnouncement[] = [
  {
    id: '1',
    title: '2024年度營運目標公告',
    content: '各位同仁好，新的一年我們將致力於擴展市場版圖，強化研發能力，預計在Q2推出新一代產品線。',
    date: '2024-03-20',
    author: {
      id: 'A0001',
      name: '魏自立'
    },
    priority: 'high'
  },
  {
    id: '2',
    title: '新產品線發展計畫',
    content: '為因應市場需求，我們將在下季度推出全新的環保材料產品線，請各部門配合相關準備工作。',
    date: '2024-03-18',
    author: {
      id: 'A0001',
      name: '魏自立'
    },
    priority: 'high'
  }
];