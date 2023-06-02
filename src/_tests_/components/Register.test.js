import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../components/auth/Register';
import store from '../../Redux/store';

jest.mock('../../Redux/Reducers/regSlice', () => ({
  signUp: jest.fn(),
}));

describe('Register', () => {
  it('submits the registration form successfully', async () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Enter email');
    const fullNameInput = getByPlaceholderText('Enter full name');
    const passwordInput = getByPlaceholderText('password');

    // Fill in the form inputs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
  });
});
