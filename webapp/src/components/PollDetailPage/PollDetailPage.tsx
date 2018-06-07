import * as React from 'react'
import { PollDetailPageProps } from 'components/PollDetailPage/types'
import { t } from 'modules/translation/utils'
import { Option } from 'modules/option/types'

export default class PollDetailPage extends React.PureComponent<
  PollDetailPageProps
> {
  static defaultProps = {
    poll: null
  }

  componentWillMount() {
    const { onFetchPoll, match } = this.props
    onFetchPoll(match.params.id)
  }

  getCurrentResult(): Option | null {
    const { poll } = this.props
    if (!poll) return null

    const tally: {
      optionId?: { votes: number; option: Option }
    } = poll.options.reduce(
      (tally, option) => ({ ...tally, [option.id]: { votes: 0, option } }),
      {}
    )

    for (const vote of poll.votes) {
      tally[vote.option_id].votes += 1
    }

    let currentResult: Option | null = null
    let maxVotes = 0

    for (const optionId in tally) {
      const result = tally[optionId]

      if (result.votes >= maxVotes) {
        currentResult = result.option
        maxVotes = result.votes
      }
    }

    return currentResult
  }

  render() {
    const { poll, isLoading } = this.props

    return (
      <div className="PollDetailPage">
        <h1>{t('poll_detail_page.title')}</h1>

        {isLoading || !poll ? (
          'Loading'
        ) : (
          <React.Fragment>
            {t('global.poll')}: {poll.id}
            <h4>Token</h4>
            <pre>{JSON.stringify(poll.token, null, 2)}</pre>
            <h4>Options</h4>
            <pre>{JSON.stringify(poll.options, null, 2)}</pre>
            <h4>Votes</h4>
            <pre>{JSON.stringify(poll.votes, null, 2)}</pre>
            <h4>Current Result</h4>
            <pre>{JSON.stringify(this.getCurrentResult(), null, 2)}</pre>
          </React.Fragment>
        )}
      </div>
    )
  }
}