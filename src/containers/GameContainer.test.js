import React from 'react';
import { shallow, mount } from 'enzyme';
import GameContainer from './GameContainer.js';

describe('GameContainer', () => {
  it('score board renders with inital scores 0 - 0', () => {
    const wrapper = shallow(<GameContainer />);
    expect(wrapper.find('#scoreboard').text()).toEqual('Scores Crosses-0, Noughts-0');
  });

  it('Scoreboard changes crosses 0 to 1 when crosses win', () => {
    const wrapper = mount(<GameContainer />, { attachTo: document.body });
    const clickFunction = wrapper.find('GameBoard').prop('handle');
    clickFunction(0, 0); // x playing, 0 is top left box
    clickFunction(0, 1); // 0 playing , 1 is middle top box
    clickFunction(0, 3); // x playing, 3 is middle left box
    clickFunction(0, 2); // 0 playing, 2 is top right box
    clickFunction(0, 6); // x playing, 6 is bottom left box

    expect(wrapper.find('#scoreboard').text()).toEqual('Scores Crosses-1, Noughts-0');
  })
});
