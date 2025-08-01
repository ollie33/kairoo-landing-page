import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';
import { FeedbackForm } from './FeedbackForm';

interface EarlyAccessFormProps {
  className?: string;
}

export function EarlyAccessForm({ className = '' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState('');

  const sendWelcomeEmail = async (userEmail: string) => {
    try {
      const response = await fetch('/.netlify/functions/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail
        })
      });

      if (!response.ok) {
        console.warn('Failed to send welcome email, but continuing...');
      } else {
        const result = await response.json();
        console.log('Welcome email sent successfully:', result);
      }
    } catch (error) {
      console.error('Error sending welcome email:', error);
      // 即使郵件發送失敗，我們仍然繼續流程
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 保存到localStorage作為備用
      const existingEmails = JSON.parse(localStorage.getItem('kairoo_early_access') || '[]');
      if (!existingEmails.includes(email)) {
        existingEmails.push(email);
        localStorage.setItem('kairoo_early_access', JSON.stringify(existingEmails));
      }

      // 目前使用 localStorage 儲存，你可以手動查看
      console.log('Email saved to localStorage:', email);
      console.log('All saved emails:', JSON.parse(localStorage.getItem('kairoo_early_access') || '[]'));
      
      // 發送歡迎郵件
      await sendWelcomeEmail(email);
      
      setIsSubmitted(true);
      // 延遲顯示回饋表單（可選）
      setTimeout(() => {
        setShowFeedback(true);
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !showFeedback) {
    return (
      <Card className={`p-8 text-center bg-green-50 border-green-200 ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Welcome to Kairoo! 🎉
        </h3>
        <p className="text-green-700 mb-4">
          We've sent you a welcome email! Check your inbox for exclusive updates and behind-the-scenes content.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-700 text-sm">
            📧 Check your email: <strong>{email}</strong>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="animate-pulse text-orange-600">
            <p className="text-sm">Want to help us make Kairoo even better?</p>
          </div>
        </div>
      </Card>
    );
  }

  if (showFeedback) {
    return (
      <FeedbackForm 
        userEmail={email}
        onClose={() => {
          setShowFeedback(false);
          setIsSubmitted(false);
          setEmail('');
        }}
        className={className}
      />
    );
  }

  return (
    <Card className={`p-8 ${className}`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-12 w-12 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Early Access
        </h3>
        <p className="text-gray-600">
          Be among the first to experience Kairoo when we launch!
        </p>
      </div>

      <form name="early-access" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="form-name" value="early-access" />
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            disabled={isSubmitting}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Joining...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              Join Early Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          )}
        </Button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        We'll only use your email to notify you about our launch. No spam, promise! ✨
      </p>
    </Card>
  );
} 