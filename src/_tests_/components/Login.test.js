import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from '../../components/auth/Login';

// Create a mock store with the desired initial state
const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    loggedIn: false,
  },
});

jest.mock('../../Redux/Reducers/authSlice', () => ({
  fetchCurrentUser: jest.fn(),
  login: jest.fn(),
}));

describe('Login', () => {
  it('submits the login form successfully', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Useremail');
    const passwordInput = getByPlaceholderText('Password');

    // Fill in the form inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  });
});
