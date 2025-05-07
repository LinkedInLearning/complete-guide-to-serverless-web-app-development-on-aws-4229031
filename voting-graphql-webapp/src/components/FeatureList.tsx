import React from 'react';
import { Feature } from '../types';
import { useAuth } from '../context/AuthContext';
import { Timer, ThumbsUp, ArrowUpCircle, Send } from 'lucide-react';

interface FeatureListProps {
  features: Feature[];
  onVote: (featureId: string) => void;
  notifyMe: (featureId: string, text: string, voteCount: number) => void;
}

export const FeatureList: React.FC<FeatureListProps> = ({ features, onVote, notifyMe }) => {
  const { isAuthenticated } = useAuth();

  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Closed';
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="space-y-4">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{feature.text}</h3>
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <Timer className="w-4 h-4 mr-1" />
                  {getTimeRemaining(feature.endTime)}
                </span>
                <span className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {feature.voteCount} votes
                </span>
              </div>
            </div>
            {isAuthenticated && feature.status === 'OPEN' && (
              <button
                onClick={() => onVote(feature.id)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <ArrowUpCircle className="w-4 h-4 mr-2" />
                Vote
              </button>
            )}
            {isAuthenticated && feature.status === 'OPEN' && (
              <button
                onClick={() => notifyMe(feature.id, feature.text, feature.voteCount)}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Send it to me
              </button>
              
            )}
          </div>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                feature.status === 'OPEN'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {feature.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};