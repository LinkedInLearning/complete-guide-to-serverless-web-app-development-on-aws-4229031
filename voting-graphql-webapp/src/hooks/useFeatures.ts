import { useState, useEffect } from 'react';
import { Feature } from '../types';
import { apiService } from '../services/api';

export const useFeatures = () => {
  
  const [features, setFeatures] = useState<Feature[]>([]);  

  useEffect(() => {
    async function fetchFeatures() {
      try {
        const features = await apiService.getFeatures();
        setFeatures(features);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    }
      fetchFeatures();
    }
  , []);

  const addFeature = async (text: string, userId: string) => {
    const newFeature = await apiService.createFeature(text, userId);    
    setFeatures(prev => [...prev, newFeature]);
  };

  const vote = async (featureId: string ) => {
    const feature = features.find(f => f.id === featureId);

    await apiService.voteForFeature(featureId, feature?.voteCount || 0);
    
    setFeatures(prev =>
      prev.map(feature =>
        feature.id === featureId
          ? { ...feature, voteCount: feature.voteCount + 1 }
          : feature
      )
    );
  };

  const notifyMe = async (featureId: string, text: string, votes: number) => {
    await apiService.notifyMe(featureId, text, votes);
    console.log('Notify me pressed')
  };

  // Check for expired features every second
  useEffect(() => {
   const interval = setInterval(() => {
      setFeatures(prev =>
        prev.map(feature => ({
          ...feature,
          status: new Date(feature.endTime) <= new Date() ? 'CLOSED' : 'OPEN'
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    features,
    addFeature,
    vote,
    notifyMe
  };
};