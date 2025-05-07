import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PlusCircle } from 'lucide-react';

interface CreateFeatureProps {
  onSubmit: (text: string, userId: string) => void;
}

export const CreateFeature: React.FC<CreateFeatureProps> = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;
    
    onSubmit(text.trim(), user.id);
    setText('');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Suggest a new feature..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Feature
        </button>
      </div>
    </form>
  );
};