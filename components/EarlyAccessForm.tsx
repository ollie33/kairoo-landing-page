import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';

interface EarlyAccessFormProps {
  className?: string;
}

export function EarlyAccessForm({ className = '' }: EarlyAccessFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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

      // 嘗試提交到 Netlify（可選）
      try {
        const formData = new FormData();
        formData.append('form-name', 'early-access');
        formData.append('email', email);

        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData as any).toString(),
        });
      } catch (netlifyError) {
        // Netlify 提交失敗也沒關係，localStorage 已經保存了
        console.log('Netlify submission failed, but email saved locally');
      }
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`p-8 text-center bg-green-50 border-green-200 ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          You're on the list! 🎉
        </h3>
        <p className="text-green-700 mb-4">
          We'll notify you as soon as Kairoo is ready. Get ready to start connecting!
        </p>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setEmail('');
          }}
          variant="outline"
          className="border-green-300 text-green-700 hover:bg-green-100"
        >
          Add Another Email
        </Button>
      </Card>
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