import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { compose, graphql } from 'react-apollo'

import RedirectsQuery from '../../../queries/Redirects.graphql'

import RedirectForm from './RedirectForm'
import RedirectsList from './RedirectsList'

interface Props {
  disableRedirect: (options: { variables: object }) => void
  enableRedirect: (options: { variables: object }) => void
  redirectsQuery: {
    loading: boolean
    redirects: {
      redirects: Redirect[]
      total: number
    }
  }
}

interface State {
  selectedRedirect: Redirect | null
}

const REDIRECTS_FROM = 0
const REDIRECTS_TO = 999

class Redirects extends Component<Props, State> {
  public static contextTypes = {
    startLoading: PropTypes.func.isRequired,
    stopLoading: PropTypes.func.isRequired,
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      selectedRedirect: null,
    }
  }

  public componentDidMount() {
    this.handleLoading()
  }

  public componentDidUpdate() {
    this.handleLoading()
  }

  public render() {
    const {
      redirectsQuery: { loading, redirects: redirectsData },
    } = this.props

    const { selectedRedirect } = this.state

    return (
      <div className="mw8 mr-auto ml-auto mv6 ph6">
        {loading ? (
          <span>Loading...</span>
        ) : selectedRedirect ? (
          <RedirectForm
            closeForm={this.handleFormClose}
            onInputChange={this.handleInputChange}
            redirectInfo={this.state.selectedRedirect}
          />
        ) : (
          <RedirectsList
            onCreate={this.handleRedirectCreate}
            onSelect={this.handleRedirectSelect}
            redirects={redirectsData.redirects}
            totalItems={redirectsData.total}
          />
        )}
      </div>
    )
  }

  private getDefaultRedirectInfo() {
    return {
      cacheId: '',
      disabled: false,
      endDate: '',
      from: '',
      id: 'new',
      to: '',
    }
  }

  private handleFormClose = () => {
    this.setState({ selectedRedirect: null })
  }

  private handleInputChange = (inputData: any) => {
    this.setState({
      selectedRedirect: {
        ...this.state.selectedRedirect,
        ...inputData,
      },
    })
  }

  private handleLoading = () => {
    if (this.props.redirectsQuery.loading) {
      this.context.startLoading()
    } else {
      this.context.stopLoading()
    }
  }

  private handleRedirectCreate = () => {
    this.setState({
      selectedRedirect: this.getDefaultRedirectInfo(),
    })
  }

  private handleRedirectSelect = (event: { rowData: Redirect }) => {
    this.setState({
      selectedRedirect: event.rowData,
    })
  }
}

export default compose(
  graphql(RedirectsQuery, {
    name: 'redirectsQuery',
    options: {
      variables: {
        from: REDIRECTS_FROM,
        to: REDIRECTS_TO,
      },
    },
  }),
)(Redirects)