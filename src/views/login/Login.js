import { useState } from "react";
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Stack, 
  Divider, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SvgIcon,
  FormHelperText
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import InputForm from "../../components/InputForm/InputForm";
import { validate } from 'react-email-validator';
import './Login.css';

function Login() {

  const [offerTermsOpen, setOfferTermsOpen] = useState(false);

  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');

  const [fullAddress, setFullAddress] = useState('');
  const [fullAddressError, setFullAddressError] = useState('');

  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const [dateBirth, setDateBirth] = useState('');
  const [dateBirthError, setDateBirthError] = useState('');

  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [validated, setValidated] = useState(false);

  function toggleOfferTermsVisivility() {
    setOfferTermsOpen(!offerTermsOpen);
  }

  function handleLogin(event) {
    const form = event.currentTarget;
    
    event.preventDefault();
    event.stopPropagation();

    if(form.checkValidity() && fullNameError === 'none') {
      const newUser = {
        fullName: fullName,
        fullAddress: fullAddress,
        mobileNumber: mobileNumber,
        dateBirth: dateBirth,
        gender: gender,
        email: email
      }

      sendRegistrationData(newUser);

      setValidated(true)
    } else {
      validateFullName();
      validateFullAddress();
      validateMobileNumber();
      validateDateBirth();
      validateGender();
      validateEmail();
    }
  }

  function sendRegistrationData(userData) {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }

  function validateFullName() {
    if(fullName.length === 0) {
      setFullNameError('Required field.');
    } else if(fullName.trim().split(/\s+/).length < 2) {
      setFullNameError('Add both first and last name')
    } else {
      setFullNameError('none');
    }
  }

  function validateFullAddress() {
    if(fullAddress.length === 0) {
      setFullAddressError('Please enter a valid residential address.');
    } else {
      setFullAddressError('none');
    }
  }

  function validateMobileNumber() {
    if(mobileNumber.length === 0) {
      setMobileNumberError('Required field.');
    } else if(mobileNumber.length < 10) {
      setMobileNumberError('Phone number must be at least 10 digits.')
    } else  {
      setMobileNumberError('none');
    }
  }

  function validateDateBirth() {
    const currentDate = new Date();
    const currentYear = currentDate.getUTCFullYear();
    const yearDateBirth = new Date(dateBirth).getUTCFullYear();
    const age = currentYear - yearDateBirth;

    if(!dateBirth) {
      setDateBirthError('Invalid format - must be DD/MM/YYYY');
    } else if(age < 18) {
      setDateBirthError('You must be at least 18 to register on this site.');
    } else {
      setDateBirthError('none');
    }
  }

  function validateGender() {
    if(gender.length === 0) {
      setGenderError('Required field.');
    } else  {
      setGenderError('none');
    }
  }

  function validateEmail() {
    if(email.length === 0) {
      setEmailError('Required field.');
    } else if (!validate(email)) {
      setEmailError('Invalid email.');
    } else {
      const domain = email.split('@')[1].split('.')[0];
      const domainsAllowed = ['gmail', 'hotmail', 'outlook'];

      if (domainsAllowed.includes(domain)) {
        setEmailError('none');
      } else {
        setEmailError('Use a personal email address (e.g. gmail.com).');
      }
    }
  }

  return (
    <Container className="LoginContainer" disableGutters={true} maxWidth='false'>
      <AppBar position="fixed" elevation={0}>
        <Toolbar className="Toolbar">
          <Typography variant="h6" component='a' sx={{ flexGrow: 1 }}>
            <img src='logo.svg' alt='logo' width={150} height={30} loading="lazy"/>
          </Typography>
          <Button variant="outlined" size="medium">How it works</Button>
        </Toolbar>
      </AppBar>

      <Grid className='signup-container' container>
        <Grid className='login-image-grid' size={{ xs: 12, md: 6 }}>
          <img src='login-image.png' alt='logo' width={'100%'} height={'100%'} loading="lazy"/>
        </Grid>

        <Grid className='login-form-grid' size={{ xs: 12, md: 6 }}>
          <Box className="login-form-container" component={'div'}>
            <Stack className="login-form-stack">
              <Box className="signup-stack" component={'div'}>
                <span>Sign up</span>
              </Box>

              <Box className="form-container" component={'div'}>
                <form id="welcome-form" data-testid="welcome-form" className="welcome-form" validate={validated ? 1 : 0} onSubmit={handleLogin} noValidate autoComplete="off">
                  <Container className="welcome-form-container" disableGutters={true} maxWidth='false'>
                    <Box component={'div'} className="signup-info">
                      <Stack className="signup-title" direction={'row'} alignItems={'center'} height={'43px'} p={'8px 16px'}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="currentColor" 
                          aria-hidden="true" 
                          focusable="false" 
                          style={{ verticalAlign: 'middle', margin: 'auto 8px auto 0' }}
                          width={'24px'}
                          height={'24px'}
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" 
                            clipRule="evenodd"
                          ></path>
                        </svg>

                        <span>Your information</span>
                      </Stack>

                      <Divider />

                      <InputForm 
                        inputId={'full-name'}
                        inputType={'text'}
                        inputLabel={'Full name'}
                        inputPlaceholder={''}
                        inputValue={fullName} 
                        setInputValue={setFullName}
                        inputValueError={fullNameError}
                        setInputValueError={setFullNameError}
                        validateInputValue={validateFullName}
                      />

                      <InputForm 
                        inputId={'full-address'}
                        inputType={'text'}
                        inputLabel={'Full Address (e.g. "1 Elm Way, San Francisco, CA")'}
                        inputPlaceholder={'Start typing'}
                        inputValue={fullAddress} 
                        setInputValue={setFullAddress}
                        inputValueError={fullAddressError}
                        setInputValueError={setFullAddressError}
                        validateInputValue={validateFullAddress}
                      />

                      <InputForm 
                        inputId={'mobile-number'}
                        inputType={'tel'}
                        inputLabel={'Mobile number'}
                        inputPlaceholder={'(000) 000-0000'}
                        inputValue={mobileNumber} 
                        setInputValue={setMobileNumber}
                        inputValueError={mobileNumberError}
                        setInputValueError={setMobileNumberError}
                        validateInputValue={validateMobileNumber}
                      />

                      <InputForm 
                        inputId={'date-birth'}
                        inputType={'date'}
                        inputLabel={'Date of birth'}
                        inputPlaceholder={''}
                        inputValue={dateBirth} 
                        setInputValue={setDateBirth}
                        inputValueError={dateBirthError}
                        setInputValueError={setDateBirthError}
                        validateInputValue={validateDateBirth}
                      />
                      
                      <FormControl className={`gender-form-control ${genderError && genderError !== 'none' ? 'error' : ''} ${gender && genderError === 'none' ? 'success' : ''}`} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel className={genderError && genderError !== 'none' ? 'error' : ''} htmlFor="gender-select-standard-label">
                          {
                            genderError.length === 0 || genderError === 'none' ? 'Gender' : genderError
                          }
                        </InputLabel>
                        <Select
                          required
                          data-testid='gender-select-standard'
                          labelId="gender-select-standard-label"
                          id="gender-select-standard"
                          label="Gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          onBlur={() => validateGender()}
                          onFocus={() => setGenderError('')}
                          className={genderError && genderError !== 'none' ? 'error' : ''}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>

                    <Box component={'div'} className="email-signup">
                      <FormControl className="email-form-control" variant="outlined" error={emailError && emailError !== 'none' ? true : false} fullWidth>
                        <OutlinedInput
                          required
                          aria-describedby="component-error-text"
                          data-testid='email'
                          id="email"
                          type="email"
                          placeholder="Email"
                          className="email-outlined-input"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => validateEmail()}
                          onFocus={() => setEmailError('')}
                        />
                        <FormHelperText id="component-error-text" className={`helper-text-error ${emailError && emailError !== 'none' ? '' : 'hide'}`} >
                          {emailError}
                        </FormHelperText>
                      </FormControl>

                      <Box component={'div'} className="email-button">
                        <Button type="submit" variant="contained" color="secondary" fullWidth>
                          <span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24"
                              fill="currentColor" 
                              aria-hidden="true" 
                              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1smajzm" 
                              focusable="false">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                              </svg>
                          </span>
                          Continue with Email
                        </Button>
                      </Box>

                      <Box component={'div'} className="offer-terms">
                        <Stack className="offer-terms-stack">
                          <Typography variant="b6" component='p'>
                            By signing up, I agree to the <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/terms" target="_blank">Offer Terms</Typography>
                          </Typography>

                          <Button onClick={() => toggleOfferTermsVisivility()} data-testid='OfferTermsButton'>
                            <SvgIcon>
                              <svg 
                                focusable="false" 
                                aria-hidden="true" 
                                viewBox="0 0 24 24" 
                                data-testid="KeyboardArrowDownIcon"
                                className={!offerTermsOpen ? '' : 'icon-up'}
                              >
                                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></path>
                              </svg>
                            </SvgIcon>
                          </Button>
                        </Stack>

                        {
                          offerTermsOpen ?                      
                            <Typography variant="p6" component={'span'}>
                              I agree to the <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/terms">Offer Terms</Typography> and understand I am creating a Sharecare consumer account. I agree to the Sharecare <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/privacypolicy">Privacy Policy</Typography>, <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/termsofuse">Terms</Typography>, <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/consumer-health-data-privacy-policy">Consumer Health Data Privacy Policy</Typography>, and, if applicable to me, the <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/ca-privacypolicy">Privacy Notice for California Residents</Typography>. I consent to Sharecare’s collecting and sharing of any health information I may provide, for the purposes listed in the <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/consumer-health-data-privacy-policy">Consumer Health Data Privacy Policy</Typography> and <Typography variant="inherit" component='a' href="https://www.sharecare.com/terms/privacypolicy">Privacy Policy</Typography>. I agree to receive emails, offers, alerts, and other notices. I understand that I can opt-out of marketing communications at any time.
                            </Typography>
                          : null
                        }

                      </Box>

                    </Box>
                  </Container>
                </form>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
