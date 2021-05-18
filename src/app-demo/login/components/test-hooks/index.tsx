import React, { memo } from 'react'
import { WindowsMousePosition } from '@kits'

interface IProps { }

const Index: React.FC = (props: IProps) => {
    const position = WindowsMousePosition.useWindowMousePosition()
    console.log(' =====> position', position)
    return <React.Fragment>
        <div>1231231231231231</div>
    </React.Fragment>
}

export default memo(Index)
