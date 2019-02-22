import React, { ReactNode } from 'react'
import { ToastProvider } from 'vtex.styleguide'

interface Props {
  children?: ReactNode
}

const Wrapper: React.SFC<Props> = ({children}) => (
  <ToastProvider positioning="window">
    {children}
  </ToastProvider>
)

export default React.memo(Wrapper)