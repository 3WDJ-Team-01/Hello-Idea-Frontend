/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import New from 'components/repository/New';
import produce from 'immer';

class NewContainer extends Component {
  state = {
    name: '',
    desc: '',
  };

  handleChange = ({ target }) => {
    this.setState(
      produce(draft => {
        draft[target.name] = target.value;
      }),
    );
  };

  render() {
    const { handleChange } = this;
    const { name, desc } = this.state;
    return <New name={name} desc={desc} handleChange={handleChange} />;
  }
}

export default NewContainer;
