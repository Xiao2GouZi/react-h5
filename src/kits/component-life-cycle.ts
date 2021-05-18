import { useReducer } from 'react'


/**
 * 等同于class中的this.forceUpdate
 *  
 *  import React, { memo } from 'react'
 *  import { ComponentLifeCycle } from '@kits'
 *  interface IProps {}
 *  const Index: React.FC = (props: IProps) => {
 *      const forceUpdate = ComponentLifeCycle.useForceUpdate()
 *      return <React.Fragment>
 *          <div onClick={forceUpdate}>asdasd</div>
 *      </React.Fragment>
 *  }
 *  export default memo(Index)
 */
export function useForceUpdate() {
    const [ignored, forceUpdate] = useReducer((x: number) => x + 1, 0);
    return forceUpdate
}