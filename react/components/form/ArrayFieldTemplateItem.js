import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, IconArrowUp, IconArrowDown, IconDelete, IconCaretUp, IconCaretDown } from 'vtex.styleguide'

export default class ArrayFieldTemplateItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    index: PropTypes.number,
    hasMoveUp: PropTypes.bool,
    hasMoveDown: PropTypes.bool,
    onReorderClick: PropTypes.func,
    hasRemove: PropTypes.bool,
    onDropIndexClick: PropTypes.func,
    schema: PropTypes.object,
  }

  state = {
    isOpen: false,
  }

  container = React.createRef()

  handleLabelClick = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const {
      children,
      index,
      hasMoveUp,
      hasMoveDown,
      onReorderClick,
      hasRemove,
      onDropIndexClick,
    } = this.props
    const { isOpen } = this.state

    return (
      <div
        ref={this.container}
        style={{
          transition: 'height 300ms ease-in-out, opacity 150ms ease-in-out',
        }}
      >
        <div className="flex justify-between">
          <div className="flex items-center">
            <span
              className="f6"
              style={{
                border: '2px solid #D8D8D8',
                borderRadius: '5px',
                padding: '3px 8px 3px 8px',
                fontColor: '#727273',
                fontWeight: 'bold',
              }}
            >
              {index + 1}
            </span>
            <label
              className="f6"
              style={{
                padding: '3px 8px 3px 8px',
                font: '8px #727273',
                fontWeight: 'bold',
              }}
            >
              {children.props.schema.title}
            </label>
          </div>
          <div className="flex items-center">
            {hasMoveDown && <button
              style={{
                padding: '3px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={onReorderClick(
                index,
                index + 1
              )}>
              <IconArrowDown size="12" color="#969799" />
            </button>}
            {hasMoveUp && <button
              style={{
                padding: '3px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={onReorderClick(
                index,
                index - 1
              )}>
              <IconArrowUp size="12" color="#969799" />
            </button>}
            {hasRemove && (
              <Button
                size="small"
                variation="tertiary"
                onClick={onDropIndexClick(index)}
              >
                <IconDelete size="15" color="#969799" />
              </Button>
            )}
            <span
              onClick={this.handleLabelClick}
              style={{
                padding: '3px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {isOpen ? (
                <IconCaretUp size="12" color="#D8D8D8" />
              ) : (
                <IconCaretDown size="12" color="#D8D8D8" />
              )}
            </span>
          </div>
        </div>
        {isOpen && children}
      </div>
    )
  }
}
