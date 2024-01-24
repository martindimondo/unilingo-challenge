import React from 'react';
import './App.css';
import YouTubeView from './views/YouTubeView';


function App() {
  // On real productions systems you must to use react router
  // to handle url matching, here we only have one page

  return (
    <YouTubeView />
  );
}

export default App;
