import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import DeleteHouse from '../../components/delete house/deleteHouse';

// Create a mock Redux store
const mockStore = configureStore([thunk]);

jest.mock('../../Redux/Reducers/addHouseSlice', () => ({
  deleteHouse: jest.fn(),
}));

describe('DeleteHouse', () => {
  it('should render and delete a house', async () => {
    // Create initial state for the mock store
    const initialState = {
      houses: {
        houses: [
          { id: 1, name: 'House 1' },
        ],
        status: 'succeeded',
      },
    };

    // Create a mock store with the initial state
    const store = mockStore(initialState);

    // Render the DeleteHouse component with the mock store
    const { getByText, getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DeleteHouse />
        </MemoryRouter>
      </Provider>,
    );

    // Check if the houses are rendered
    expect(getByText('House 1')).toBeInTheDocument();
    expect(getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
