import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import produce from 'immer';
import Header from 'components/group/Header';
import GroupWrapper from 'components/group/GroupWrapper';
import Repositories from 'components/group/Repositories';
import Setting from 'components/group/Setting';

class GroupContainer extends Component {
  state = {
    info: {
      group_name: '',
      group_img: '',
      group_bgimg: '',
      group_intro: '',
      user_id: '',
    },
    repositories: {
      all: [],
    },
    member: [],
    filter: 'all',
    searchTo: '',
  };

  componentDidMount() {
    const { groupId } = this.props;
    axios
      .post('/api/main/project/', { user_id: 0, group_id: groupId })
      .then(res => {
        this.setState(
          produce(draft => {
            const all = [];
            Object.keys(res.data).map(category => {
              res.data[category].map(repo => {
                all.push(repo);
              });
            });
            draft.repositories = {
              ...res.data,
              all,
            };
          }),
        );
      });
    axios.post('/api/group_entry/', { group_id: groupId }).then(res => {
      this.setState(
        produce(draft => {
          draft.member = res.data;
        }),
      );
    });
    axios.post('/api/group/detail/', { group_id: groupId }).then(res => {
      this.setState(
        produce(draft => {
          draft.info = res.data;
        }),
      );
    });
  }

  handleFilter = e => {
    e.persist();
    e.stopPropagation();

    this.setState(
      produce(draft => {
        draft.filter = e.target.attributes.name.nodeValue;
      }),
    );
  };

  handleSearchTo = e => {
    e.persist();

    this.setState(
      produce(draft => {
        draft.searchTo = e.target.value;
      }),
    );
  };

  renderMenu = menu => {
    const { handleFilter, handleSearchTo } = this;
    const { groupId } = this.props;
    const { repositories, filter, searchTo } = this.state;

    switch (menu) {
      // case 'settings':
      //   return (
      //     <Setting
      //       repositoryId={repositoryId}
      //       name={name}
      //       description={description}
      //       handleChange={handleChange}
      //       handleSubmit={handleSubmit}
      //       handleRemove={handleRemove}
      //     />
      //   );
      default:
        return (
          <Repositories
            groupId={groupId}
            repositories={repositories}
            filter={filter}
            searchTo={searchTo}
            handleFilter={handleFilter}
            handleSearchTo={handleSearchTo}
          />
        );
    }
  };

  render() {
    const { renderMenu } = this;
    const { url, menu, groupId } = this.props;

    return (
      <>
        <Header url={url} menu={menu} groupId={groupId} />
        <GroupWrapper>{renderMenu(menu)}</GroupWrapper>
      </>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupContainer);
