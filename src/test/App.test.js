import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });



describe('Render App', () => {
  // test the App renders as expected
  test('Render Initial App component - register', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();


    })
    
    test('Test email and password onChange events - register', async () => {
      render(<App />)
      var email = await screen.getByPlaceholderText('Enter email');
      console.log(email)
      await userEvent.type(email, 'test@123.com');

      expect(email.pendingProps.onChange).toHaveBeenCalledTimes(1);
    
      expect
    
    });

})