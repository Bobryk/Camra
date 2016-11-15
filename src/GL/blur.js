import GL from 'gl-react'
import React from 'react'
import Blur1D from './blur1d'

export default GL.createComponent(({ width, height, factor, children }) =>
    <Blur1D width={width} height={height} direction={[ factor, 0 ]}>
      <Blur1D width={width} height={height} direction={[ 0, factor ]}>
        {children}
      </Blur1D>
    </Blur1D>
, { displayName: 'Blur' })
