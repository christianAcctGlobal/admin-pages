import { find, zip } from 'ramda'
import React from 'react'
import { ButtonWithIcon, Spinner, ToastConsumer } from 'vtex.styleguide'

import Operations from './Operations'

import CreateNewIcon from './icons/CreateNewIcon'
import StyleCard from './StyleCard'

interface Props {
  startEditing: (style: Style) => void
  setStyleAsset: (asset: StyleAssetInfo) => void
}

const compareStyles = (a: Style, b: Style) => {
  const toArray = ({ selected, editable, app, name, id }: Style) => {
    return [selected ? 0 : 1, editable ? 0 : 1, app, name, id]
  }
  return zip(toArray(a), toArray(b)).reduce((acc, [value1, value2]) => {
    if (acc !== 0) {
      return acc
    }
    if (value1 < value2) {
      return -1
    }
    if (value1 > value2) {
      return 1
    }
    return acc
  }, 0)
}

const StyleList: React.FunctionComponent<Props> = ({
  startEditing,
  setStyleAsset,
}) => {
  return (
    <Operations>
      {({
        listStyles: { data, loading },
        saveSelectedStyle,
        createStyle,
        deleteStyle,
      }) => {
        const unsortedStyles = data && data.listStyles
        const listStyles = unsortedStyles && unsortedStyles.sort(compareStyles)

        const selected = listStyles && find(style => style.selected, listStyles)
        if (selected && !loading) {
          setStyleAsset({ type: 'path', selected: true, value: selected.path })
        }

        return loading ? (
          <div className="pt7 flex justify-around">
            <Spinner />
          </div>
        ) : (
          <section className="flex flex-column ph3 h-100 overflow-x-hidden">
            <header className="flex justify-between pv5 pl5 items-center flex-shrink-0 bg-white z-1">
              <h1 className="f3 fw4">Styles</h1>
              <ButtonWithIcon
                icon={<CreateNewIcon />}
                variation="tertiary"
                onClick={() => createStyle({ variables: { name: 'Untitled' } })}
              >
                New
              </ButtonWithIcon>
            </header>
            <div className="flex flex-column flex-grow-1 overflow-y-auto">
              <ToastConsumer>
                {({ showToast }) =>
                  listStyles &&
                  listStyles.map(style => (
                    <StyleCard
                      key={style.id}
                      style={style}
                      selectStyle={({ id, name }: Style) =>
                        saveSelectedStyle({ variables: { id } }).then(() => {
                          showToast({
                            horizontalPosition: 'right',
                            message: `Style '${name}' was selected.`,
                          })
                        })
                      }
                      deleteStyle={({ config, name, id }: Style) => {
                        deleteStyle({ variables: { id } }).then(() => {
                          showToast({
                            action: {
                              label: 'Undo',
                              onClick: () => {
                                createStyle({ variables: { name, config } })
                              },
                            },
                            duration: Infinity,
                            horizontalPosition: 'right',
                            message: `Style '${name}' was deleted.`,
                          })
                        })
                      }}
                      duplicateStyle={({ name, config }: Style) =>
                        createStyle({
                          variables: { name: `Copy of ${name}`, config },
                        })
                      }
                      startEditing={startEditing}
                    />
                  ))
                }
              </ToastConsumer>
            </div>
          </section>
        )
      }}
    </Operations>
  )
}

export default StyleList
