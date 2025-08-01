import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { CheckCircle, MessageSquare, Star, Send } from 'lucide-react';

interface FeedbackFormProps {
  userEmail: string;
  onClose: () => void;
  className?: string;
}

export function FeedbackForm({ userEmail, onClose, className = '' }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      setError('Please share your thoughts with us');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 保存回饋到localStorage
      const existingFeedback = JSON.parse(localStorage.getItem('kairoo_feedback') || '[]');
      const newFeedback = {
        email: userEmail,
        feedback: feedback.trim(),
        rating: rating,
        timestamp: new Date().toISOString()
      };
      
      existingFeedback.push(newFeedback);
      localStorage.setItem('kairoo_feedback', JSON.stringify(existingFeedback));

      // 發送通知郵件（這裡可以整合你的郵件服務）
      await sendNotificationEmail(userEmail, feedback, rating);
      
      setIsSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendNotificationEmail = async (email: string, feedback: string, rating: number) => {
    try {
      const response = await fetch('/.netlify/functions/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          feedback,
          rating
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error sending email:', error);
      // 即使郵件發送失敗，我們仍然保存回饋
      throw error;
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (isSubmitted) {
    return (
      <Card className={`p-8 text-center bg-blue-50 border-blue-200 ${className}`}>
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-blue-800 mb-2">
          Thank you for your feedback! 💝
        </h3>
        <p className="text-blue-700 mb-4">
          We've sent you a confirmation email. Your feedback helps us make Kairoo even better!
        </p>
        <Button 
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Continue
        </Button>
      </Card>
    );
  }

  return (
    <Card className={`p-8 ${className}`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <MessageSquare className="h-12 w-12 text-orange-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Help us make Kairoo even better! 🚀
        </h3>
        <p className="text-gray-600">
          Your feedback is optional but incredibly valuable. What would you love to see in Kairoo?
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How excited are you about Kairoo? ⭐
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`p-2 rounded-full transition-all ${
                  rating >= star 
                    ? 'text-yellow-400 bg-yellow-50' 
                    : 'text-gray-300 hover:text-yellow-300'
                }`}
              >
                <Star className={`h-6 w-6 ${rating >= star ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-center text-sm text-gray-600 mt-2">
              {rating === 1 && "Not very excited"}
              {rating === 2 && "Somewhat interested"}
              {rating === 3 && "Pretty excited"}
              {rating === 4 && "Very excited"}
              {rating === 5 && "Super excited!"}
            </p>
          )}
        </div>

        {/* Feedback */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
            What features would you love to see? 💭
          </label>
          <Textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us what you're looking for in a social connection app..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all min-h-[120px]"
            disabled={isSubmitting}
            required
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Email Display */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">
            We'll send updates to: <span className="font-medium text-gray-900">{userEmail}</span>
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={handleSkip}
            variant="outline"
            className="flex-1"
            disabled={isSubmitting}
          >
            Skip for now
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || !feedback.trim()}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                Send Feedback
                <Send className="ml-2 h-4 w-4" />
              </div>
            )}
          </Button>
        </div>
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        Your feedback helps us build the perfect app for you! 🎯
      </p>
    </Card>
  );
} 