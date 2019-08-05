/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProgressIndicator from 'components/base/ProgressIndicator';
import Nav from 'components/search/Nav';
import SearchWrapper from 'components/search/SearchWrapper';
import Results from 'components/search/Results';
import produce from 'immer';
import axios from 'axios';

class SearchContainer extends Component {
  state = {
    state: 'pending',
    type: 'Repositories',
    results: {
      Repositories: [],
      Users: [],
      Groups: [],
      Keywords: [],
    },
  };

  componentDidMount() {
    const { searchTo, loggedUserId } = this.props;
    axios.post('/api/search/', { searchTo }).then(res =>
      this.setState(
        produce(draft => {
          draft.state = 'success';
          draft.results.Repositories = res.data.repositories;
          draft.results.Users = res.data.users;
          draft.results.Groups = res.data.groups;
        }),
      ),
    );
    if (loggedUserId)
      axios.post('/api/search/log/create/', {
        user_id: loggedUserId,
        keyword: searchTo,
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const { loggedUserId, searchTo } = this.props;

    if (prevProps.loggedUserId !== loggedUserId) {
      axios.post('/api/search/log/create/', {
        user_id: loggedUserId,
        keyword: searchTo,
      });
    }
    if (prevProps.searchTo !== searchTo) {
      axios.post('/api/search/', { searchTo }).then(res =>
        this.setState(
          produce(draft => {
            draft.results.Repositories = res.data.repositories;
            draft.results.Users = res.data.users;
            draft.results.Groups = res.data.groups;
          }),
        ),
      );
      axios.post('/api/search/log/create/', {
        user_id: loggedUserId,
        keyword: searchTo,
      });
    }
  }

  handleType = e => {
    this.setState(
      produce(this.state, draft => {
        draft.type = e.target.attributes.name.nodeValue;
      }),
    );
  };

  render() {
    const { handleType } = this;
    const { authState } = this.props;
    const { state, type, results } = this.state;
    if (state === 'success' && authState === 'success')
      return (
        <SearchWrapper>
          <Nav
            type={type}
            typeList={Object.keys(results)}
            handleType={handleType}
          />
          <Results type={type} results={results} />
        </SearchWrapper>
      );
    return <ProgressIndicator />;
  }
}

const mapStateToProps = state => ({
  authState: state.auth.state,
  loggedUserId: state.auth.userInfo.user_id,
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchContainer),
);
