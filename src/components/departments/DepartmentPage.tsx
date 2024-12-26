import React from 'react';
import { MessageSquare, PlusCircle } from 'lucide-react';
import AiAssistant from '../common/AiAssistant';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  comments: number;
}

interface DepartmentPageProps {
  departmentId: string;
  departmentName: string;
}

export default function DepartmentPage({ departmentId, departmentName }: DepartmentPageProps) {
  const posts: Post[] = [
    {
      id: '1',
      title: '部門週會通知',
      content: '本週五下午 2 點將召開部門週會，請所有同仁準時參加。',
      author: '部門主管',
      date: '2024-03-20',
      comments: 5
    },
    // 更多貼文...
  ];

  return (
    <div className="max-w-5xl mx-auto py-6">
      <AiAssistant />
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{departmentName}</h2>
        <p className="text-gray-600">部門內部討論與公告</p>
      </div>

      <div className="mb-6">
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          <PlusCircle className="w-5 h-5" />
          <span>發布新公告</span>
        </button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-4">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments} 則留言</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}