import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Pathfinder from './Pathfinder';

configure({ adapter: new Adapter() });

const app = shallow(<Pathfinder />, { disableLifecycleMethods: true });

it('renders without a hitch', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pathfinder />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('<Pathfinder />', () => {
  beforeAll(() => {
    global.fetch = jest.fn();
  })

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Pathfinder />, { disableLifecycleMethods: true });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has a page', () => {
    expect(wrapper.find('.page')).toBeDefined();
  });

  it('has a maze', () => {
    expect(wrapper.find('.maze')).toBeDefined();
  });

  it('has a Maze component', () => {
    expect(wrapper.find('Maze')).toBeDefined();
  });

  test('renders solve greeting', () => {
    render(<Pathfinder />);
    const linkElement = screen.getByText(/Solve the Maze!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('the maze array has `x` in it', () => {
    expect(app.state().maze[4]).toContain('x');
    expect(new Set(app.state().maze[4])).toContain('x');
  });

  test('Should have `Go` button', () => {
    expect(wrapper.find('.btn').text()).toBe('Go');
  })
});

it('should be able to activate button with Space-bar', () => {
  const component = mount(<Pathfinder />);
  component
    .find('.btn')
    .simulate('keydown', { keyCode: 32 });
  expect(component).toMatchSnapshot();
  component.unmount();
});

const clickFn = jest.fn();
describe('Pathfinder', () => {
  it('button click should call solve function', () => {
    const component = shallow(<Pathfinder onClick={clickFn()} />);
    component
      .find('.btn')
      .simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
