import { Department } from '../types/department';

export const departments: Department[] = [
  { 
    id: 'management',
    name: '管理部',
    color: 'bg-blue-500',
    description: '公司行政與人資管理',
    tags: ['人力資源', '行政管理', '總務']
  },
  { 
    id: 'sales',
    name: '業務部',
    color: 'bg-green-500',
    description: '銷售與客戶開發',
    tags: ['銷售', '客戶開發', '業務推廣']
  },
  { 
    id: 'manufacturing',
    name: '製造部',
    color: 'bg-yellow-500',
    description: '產品製造與品質管理',
    tags: ['生產管理', '品質控管', '製程優化']
  },
  { 
    id: 'rd',
    name: '研發部',
    color: 'bg-purple-500',
    description: '產品研發與技術創新',
    tags: ['研發', '技術創新', '產品開發']
  },
  { 
    id: 'customer_service',
    name: '客服部',
    color: 'bg-pink-500',
    description: '客戶服務與支援',
    tags: ['客戶服務', '技術支援', '售後服務']
  },
  { 
    id: 'marketing',
    name: '行銷部',
    color: 'bg-orange-500',
    description: '市場推廣與品牌管理',
    tags: ['市場行銷', '品牌管理', '推廣活動']
  },
  { 
    id: 'adhesive_lab',
    name: '膠藝所',
    color: 'bg-indigo-500',
    description: '膠類產品研發與測試',
    tags: ['產品研發', '品質測試', '技術研究']
  }
];