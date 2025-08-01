import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface EmailData {
  email: string;
  timestamp: string;
}

interface FeedbackData {
  email: string;
  feedback: string;
  rating: number;
  timestamp: string;
}

const AdminPanel: React.FC = () => {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [feedback, setFeedback] = useState<FeedbackData[]>([]);
  const [activeTab, setActiveTab] = useState<'emails' | 'feedback'>('emails');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  const loadEmails = () => {
    try {
      const savedEmails = localStorage.getItem('kairoo_early_access');
      if (savedEmails) {
        const emailList = JSON.parse(savedEmails);
        setEmails(emailList);
      }
      
      const savedFeedback = localStorage.getItem('kairoo_feedback');
      if (savedFeedback) {
        const feedbackList = JSON.parse(savedFeedback);
        setFeedback(feedbackList);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const exportToCSV = () => {
    if (activeTab === 'emails') {
      if (emails.length === 0) {
        alert('沒有 emails 可以導出');
        return;
      }

      const csvContent = [
        'Email,Timestamp',
        ...emails.map(email => `${email.email},${email.timestamp}`)
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `kairoo_emails_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      if (feedback.length === 0) {
        alert('沒有回饋可以導出');
        return;
      }

      const csvContent = [
        'Email,Feedback,Rating,Timestamp',
        ...feedback.map(item => `${item.email},"${item.feedback}",${item.rating},${item.timestamp}`)
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `kairoo_feedback_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const clearAllData = () => {
    const message = activeTab === 'emails' 
      ? '確定要清除所有 emails 嗎？此操作無法復原。'
      : '確定要清除所有回饋嗎？此操作無法復原。';
      
    if (confirm(message)) {
      if (activeTab === 'emails') {
        localStorage.removeItem('kairoo_early_access');
        setEmails([]);
        alert('所有 emails 已清除');
      } else {
        localStorage.removeItem('kairoo_feedback');
        setFeedback([]);
        alert('所有回饋已清除');
      }
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    if (!isVisible) {
      loadEmails();
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={toggleVisibility}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          📧 管理 Emails ({emails.length})
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">📧 Kairoo Email 管理面板</CardTitle>
            <Button 
              variant="outline" 
              onClick={toggleVisibility}
              className="text-white border-white hover:bg-white/20"
            >
              ✕ 關閉
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('emails')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'emails'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              📧 Emails ({emails.length})
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'feedback'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              💬 Feedback ({feedback.length})
            </button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg">
                總計: {activeTab === 'emails' ? emails.length : feedback.length} 個 {activeTab === 'emails' ? 'emails' : '回饋'}
              </Badge>
              <Button 
                onClick={loadEmails}
                variant="outline"
                size="sm"
              >
                🔄 重新整理
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={exportToCSV}
                disabled={(activeTab === 'emails' ? emails.length : feedback.length) === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                📥 導出 CSV
              </Button>
              <Button 
                onClick={clearAllData}
                variant="destructive"
                size="sm"
              >
                🗑️ 清除全部
              </Button>
            </div>
          </div>

          <Separator className="mb-4" />

          {activeTab === 'emails' ? (
            emails.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">📭</div>
                <p>還沒有收集到任何 emails</p>
                <p className="text-sm">當用戶提交表單後，emails 會出現在這裡</p>
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="grid gap-3">
                  {emails.map((email, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{email.email}</div>
                        <div className="text-sm text-gray-500">
                          提交時間: {new Date(email.timestamp).toLocaleString('zh-TW')}
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        #{index + 1}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            feedback.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-2">💬</div>
                <p>還沒有收集到任何回饋</p>
                <p className="text-sm">當用戶提交回饋後，會出現在這裡</p>
              </div>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="grid gap-3">
                  {feedback.map((item, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium text-gray-900">{item.email}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ⭐
                              </span>
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            #{index + 1}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>回饋:</strong> {item.feedback}
                      </div>
                      <div className="text-xs text-gray-500">
                        提交時間: {new Date(item.timestamp).toLocaleString('zh-TW')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel; 