import React, { useEffect } from 'react';
import './App.less';
import { Button } from '@components'


var viewportUnitsBuggyfill = require('viewport-units-buggyfill');


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

    viewportUnitsBuggyfill.refresh();

  }, [])



  return (
    <div className="App">
      <Button>点我</Button>
      <span className='title-name'>app</span>
    </div>
  );
}

export default App;
