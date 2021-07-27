import React from 'react'
import {
  Alert,
  ThemeProvider,
  createSystem,
  tag,
  Flex,
  IconNotifications,
  Anchor,
} from '@vtex/admin-ui'
import { useIntl } from 'react-intl'
import { useRuntime } from 'vtex.render-runtime'

const system = createSystem('admin-pages')

export function TemporaryAlert() {
  const { workspace, production } = useRuntime()
  const { formatMessage } = useIntl()

  if (workspace !== 'newadmin' || !production) {
    return null
  }

  const url = window.top.location.href.replace(`${workspace}--`, '')

  return (
    <ThemeProvider system={system}>
      <tag.div
        csx={{
          padding: 4,
        }}
      >
        <Alert visible fluid>
          <Flex>
            <Flex align="center">
              <IconNotifications
                csx={{
                  color: 'blue',
                }}
              />
            </Flex>
            <Flex
              align="center"
              csx={{
                marginLeft: 2,
              }}
            >
              <span>
                {formatMessage({ id: 'admin/pages.editor.newadmin.alert' })}
                <Anchor href={url} target="_blank">
                  {formatMessage({
                    id: 'admin/pages.editor.newadmin.alert.anchor',
                  })}
                </Anchor>
              </span>
            </Flex>
          </Flex>
        </Alert>
      </tag.div>
    </ThemeProvider>
  )
}
