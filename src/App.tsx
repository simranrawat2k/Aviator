import React from 'react';
import Header from './component/Header';
import Loader from './component/Loader';
import Graph from './component/Graph';
import Main from './component/Main';
import MovingDots from "./component/Demo"
import AudioPlayer from './component/AudioPlayer';

function App() {
  return (
    <div>
       <AudioPlayer />
      <Header/>
      
      
      <Main/>

      {/* <MovingDots/> */}
    </div>
  );
}

export default App;
