
import React from 'react'
import './index.less'

const neverResolve = new Promise(() => { });
function Suspender({ suspend }: { suspend: boolean }) {
  if (suspend) {
    throw neverResolve;
  } else {
    return null;
  }
}

function Preload({ show, children }: { show: boolean, children: React.ReactNode}) {
  return (
    <React.Suspense fallback={null}>
      {children}
      <Suspender suspend={!show} />
    </React.Suspense>
  );
}


export default Preload