import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { useFeatures } from './hooks/useFeatures';
import { Header } from './components/Header';
import { CreateFeature } from './components/CreateFeature';
import { FeatureList } from './components/FeatureList';

function App() {
  const { features, addFeature, vote, notifyMe } = useFeatures();

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-5xl mx-auto px-4">
          <CreateFeature onSubmit={addFeature} />
          <FeatureList 
            features={features.sort((a, b) => b.voteCount - a.voteCount)} 
            onVote={vote}
            notifyMe={notifyMe}
          />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;