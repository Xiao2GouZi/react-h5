import React, { useEffect } from 'react';
import './App.less';
import { Button } from '@components'



const App: React.FC = () => {


  useEffect(() => {

    console.log(' -----> __DEV__', __DEV__)

    console.log(' -----> VERSION', VERSION)

    console.log(process.env)

  }, [])



  return (
    <div className="App">
      <Button>点我</Button>
      <span>app</span>
    </div>
  );
}

export default App;
