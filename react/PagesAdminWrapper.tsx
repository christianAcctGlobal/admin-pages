import { mapObjIndexed, values } from 'ramda'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'
import { Tab, Tabs } from 'vtex.styleguide'

import AdminStructure from './components/admin/AdminStructure'
import TargetPathContext from './components/admin/TargetPathContext'
import Loader from './components/Loader'
import { useAdminLoadingContext } from './utils/AdminLoadingContext'

export interface TargetPathRenderProps {
  targetPath: string
  setTargetPath: (s: string) => void
}

const fields = {
  pages: {
    path: 'pages',
    titleId: 'admin/pages.admin.tabs.pages',
  },
  redirects: {
    path: 'redirects',
    titleId: 'admin/pages.admin.tabs.redirects',
  },
}

interface FieldInfo {
  path: string
  titleId: string
}

interface CustomProps {
  targetPath: string
}

defineMessages({
  pages: {
    defaultMessage: 'Pages',
    id: 'admin/pages.admin.tabs.pages',
  },
  redirects: {
    defaultMessage: 'Redirects',
    id: 'admin/pages.admin.tabs.redirects',
  },
})

type Props = CustomProps & RenderContextProps

const PagesAdminWrapper: React.FunctionComponent<Props> = ({ children }) => {
  const [targetPath, setTargetPath] = useState('')
  const { startLoading } = useAdminLoadingContext()
  const runtime = useRuntime()
  const intl = useIntl()

  return (
    <TargetPathContext.Provider value={{ targetPath, setTargetPath }}>
      <AdminStructure title="CMS">
        <div className="ph7">
          <Tabs>
            {values(
              mapObjIndexed(
                (info: FieldInfo, key: string) => (
                  <Tab
                    active={
                      targetPath.startsWith(info.path) &&
                      (targetPath === '' ? targetPath === info.path : true)
                    }
                    key={key}
                    label={intl.formatMessage({ id: info.titleId })}
                    onClick={() => {
                      runtime.navigate({ to: '/admin/app/cms/' + info.path })
                      startLoading()
                      setTargetPath(info.path)
                    }}
                  />
                ),
                fields
              )
            )}
          </Tabs>
        </div>

        <div className="ma7">{runtime.preview ? <Loader /> : children}</div>
      </AdminStructure>
    </TargetPathContext.Provider>
  )
}

export default PagesAdminWrapper
