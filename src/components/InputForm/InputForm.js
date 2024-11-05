import { 
  FormControl,
  Input,
  InputLabel,
  InputAdornment
} from "@mui/material";
import { PatternFormat } from 'react-number-format';

function InputForm(props) {

  const {
    inputId, 
    inputType, 
    inputLabel, 
    inputPlaceholder, 
    inputValue, 
    setInputValue, 
    inputValueError, 
    setInputValueError, 
    validateInputValue
  } = props;

  function mobileNumberCleanTextFunc(mobileNumber) {
    let mobileNumberCleanText = mobileNumber.replace(/[\s()-]/g, '');
    setInputValue(mobileNumberCleanText);
  }

  return (
    <FormControl className={`${inputId}-form-control ${inputValueError && inputValueError !== 'none' ? 'error' : ''} ${inputValue && inputValueError === 'none' ? 'success' : ''}`} fullWidth>
      <InputLabel className={inputValueError && inputValueError !== 'none' ? 'error' : ''} htmlFor={inputId} data-testid={'input-label'}>
        {
          inputValueError.length === 0 || inputValueError === 'none' ? inputLabel : inputValueError
        }
      </InputLabel>
      {
      inputType !== 'tel' ? 
        <Input
          required
          data-testid={inputId}
          id={inputId}
          type={inputType}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => validateInputValue()}
          onFocus={() => setInputValueError('')}
          className={inputValueError && inputValueError !== 'none' ? 'error' : ''}
          style={inputType === 'tel' ? { display: 'none' } : { display: 'flex' }}
          endAdornment={
            <InputAdornment className="styled-textfield-icon" position="end">
              {inputValue && inputValueError === 'none' ?
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  width="25" 
                  height="25"
                  style={{ color: '#00BFA5' }}
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7"></path>
                </svg>
                :                              
                <svg 
                  width="25" 
                  height="25" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className={inputValueError && inputValueError !== 'none' ? 'styled-textfield-svg-error' : ''}
                >
                  <path 
                    fill="#1C2A46" 
                    fillRule="evenodd" 
                    d="M18.6778 2.70711C17.5062 1.53554 15.6067 1.53554 14.4351 2.70711L4.17044 12.9718L3.10607 18.7795C2.85377 20.1561 4.05717 21.3595 5.43384 21.1072L11.2415 20.0429L21.5062 9.77818C22.6778 8.60661 22.6778 6.70711 21.5062 5.53554L18.6778 2.70711ZM15.8493 4.12132C16.2399 3.7308 16.873 3.7308 17.2635 4.12132L20.092 6.94975C20.4825 7.34028 20.4825 7.97344 20.092 8.36396L18.5923 9.86366L14.3496 5.62102L15.8493 4.12132ZM12.9354 7.03524L6.02533 13.9453L5.0733 19.14L10.268 18.188L17.1781 11.2779L12.9354 7.03524Z" 
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
            </InputAdornment>
          }
        />
      :
        <PatternFormat 
          required
          data-testid={inputId}
          id={inputId}
          type={inputType}
          placeholder={inputPlaceholder}
          format="(###) ###-####"
          value={inputValue}
          onChange={(e) => mobileNumberCleanTextFunc(e.target.value)}
          onBlur={() => validateInputValue()}
          onFocus={() => setInputValueError('')}
          customInput={Input}
          className={inputValueError && inputValueError !== 'none' ? 'error' : ''}
          style={inputType !== 'tel' ? { display: 'none' } : { display: 'flex' }}
          endAdornment={
            <InputAdornment className="styled-textfield-icon" position="end">
              {inputValue && inputValueError === 'none' ?
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="2" 
                  stroke="currentColor" 
                  aria-hidden="true" 
                  width="25" 
                  height="25"
                  style={{ color: '#00BFA5' }}
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round" 
                    d="M5 13l4 4L19 7"></path>
                </svg>
                :                              
                <svg 
                  width="25" 
                  height="25" 
                  fill="none"
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className={inputValueError && inputValueError !== 'none' ? 'styled-textfield-svg-error' : ''}
                >
                  <path 
                    fill="#1C2A46" 
                    fillRule="evenodd" 
                    d="M18.6778 2.70711C17.5062 1.53554 15.6067 1.53554 14.4351 2.70711L4.17044 12.9718L3.10607 18.7795C2.85377 20.1561 4.05717 21.3595 5.43384 21.1072L11.2415 20.0429L21.5062 9.77818C22.6778 8.60661 22.6778 6.70711 21.5062 5.53554L18.6778 2.70711ZM15.8493 4.12132C16.2399 3.7308 16.873 3.7308 17.2635 4.12132L20.092 6.94975C20.4825 7.34028 20.4825 7.97344 20.092 8.36396L18.5923 9.86366L14.3496 5.62102L15.8493 4.12132ZM12.9354 7.03524L6.02533 13.9453L5.0733 19.14L10.268 18.188L17.1781 11.2779L12.9354 7.03524Z" 
                    clipRule="evenodd"
                  ></path>
                </svg>
              }
            </InputAdornment>
          }
        />
      }
    </FormControl>
  );
}

export default InputForm;
