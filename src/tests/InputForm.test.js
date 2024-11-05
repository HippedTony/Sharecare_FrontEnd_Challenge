/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputForm from '../components/InputForm/InputForm';
import { useState } from 'react';

const InputFormFullNameValueChange = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueError, setInputValueError] = useState('')

  function validateFullName() {
    if(inputValue.length === 0) {
      setInputValueError('Required field.');
    } else if(inputValue.trim().split(/\s+/).length < 2) {
      setInputValueError('Add both first and last name')
    } else {
      setInputValueError('none');
    }
  }

  return (
    <InputForm
      inputId={'full-name'}
      inputType={'text'}
      inputLabel={'Full name'}
      inputPlaceholder={''}
      inputValue={inputValue} 
      setInputValue={setInputValue}
      inputValueError={inputValueError}
      setInputValueError={setInputValueError}
      validateInputValue={validateFullName}
    />
  );
};

// Test that the InputForm component renders successfully with the correct label.
test('InputForm renders successfully', () => {
  render(<InputFormFullNameValueChange/>);

  const element = screen.getByText(/full name/i);
  expect(element).toBeInTheDocument();
});

// Test that the InputForm component updates the input value when the user types in the input field.
test('InputForm updates input value on change', async () => {
  render(<InputFormFullNameValueChange/>);

  const inputElement = screen.getByTestId(/full-name/i).firstChild;
  await userEvent.type(inputElement, 'Super Man');
  expect(inputElement.value).toBe('Super Man');
});

// Test that the InputForm component displays a validation error message when the user enters an invalid input.
test('InputForm display validation error forn invalid input', async () => {
  render(<InputFormFullNameValueChange/>);

  const inputElement = screen.getByTestId(/full-name/i).firstChild;
  await userEvent.type(inputElement, 'Super');
  fireEvent.blur(inputElement);
  const errorMessageElement = screen.getByTestId(/input-label/i)
  expect(errorMessageElement.textContent).toBe('Add both first and last name');
});
