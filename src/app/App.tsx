import React, { useEffect } from 'react';
import './App.less';
import { Button, LazyComponent } from '@components'





// console.log(' ------> ', hacks)


// window.addEventListener('viewport-unit-buggyfill-init', function() {
//   console.log('getting lost in CSSOM');
// });
// window.addEventListener('viewport-unit-buggyfill-style', function() {
//   console.log('updated rules using viewport unit');
// });



const App: React.FC = () => {


  useEffect(() => {

    console.log(' -----> __DEV__', __DEV__)

    console.log(' -----> VERSION', VERSION)

    console.log(process.env)


  }, [])



  return (
    <div className="App">
      <LazyComponent>
        <Button>点我</Button>
      </LazyComponent>
      <span className='title-name'>app</span>

    </div>
  );
}

export default App;
