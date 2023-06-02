import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddHouse from '../../components/add hosue/addHouse';
import store from '../../Redux/store';

describe('It renders', () => {
  it('CountryList correctly', () => {
    const tree = render(
      <Provider store={store}>
        <MemoryRouter>
          <AddHouse />
        </MemoryRouter>
      </Provider>,
    );
    expect(tree).toMatchSnapshot();
  });
});
