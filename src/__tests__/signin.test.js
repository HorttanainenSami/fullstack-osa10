import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SigninContainer } from '../tabs/SignInView';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const submit = jest.fn();
      const { getByTestId } = render(<SigninContainer onSubmit={submit}/>);
      fireEvent.changeText(getByTestId('usernameInput'), 'kalle');
      fireEvent.changeText(getByTestId('passwordInput'), 'password');
      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
      fireEvent.press(getByTestId('submit'));
      expect(submit).toHaveBeenCalledTimes(1);
      });
      expect(submit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});
