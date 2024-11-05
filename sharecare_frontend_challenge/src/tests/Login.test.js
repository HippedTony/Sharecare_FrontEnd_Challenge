/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../views/login/Login';

// Test that the Login component renders successfully with the correct label.
test('Login renders successfully', () => {
  render(<Login />);
  const element = screen.getByText(/your information/i);
  expect(element).toBeInTheDocument();
});

// Test that the Form component offer terms button updates the svg element on click
test('Offer terms click', async () => {
  render(<Login />);

  const offerTermsButton = screen.getByTestId(/OfferTermsButton/i);
  fireEvent.click(offerTermsButton);

  const offerTermsSvg = screen.getByTestId(/KeyboardArrowDownIcon/i);
  expect(offerTermsSvg).toHaveClass('icon-up');
})
