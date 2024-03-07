const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const emailConfirm = document.getElementById('emailConfirm'); 
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const termsCheckbox = document.getElementById('terms'); // Get the checkbox input for terms










form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

    if (!termsCheckbox.checked) {
        setError(termsCheckbox, 'Please accept the terms and conditions');
        return; // Prevent form submission
    }

    // Check if any field has an error
    const errors = document.querySelectorAll('.input-control.error');
    if (errors.length > 0) {
        return; // Prevent showing popup if there are errors
    }

    // Check if all fields are successful
    if (document.querySelectorAll('.input-control.success').length === 7) { // Assuming there are 7 input fields
        showPopup(); // Show the success popup
    }
});

  

const showPopup = () => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'block';
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.style.display = 'none';
};

// Event listener for closing the popup
document.getElementById('closePopup').addEventListener('click', closePopup);



const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');

};


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const emailConfirmValue = emailConfirm.value.trim();
    const passwordValue = password.value.trim();
    const phoneValue = phone.value.trim();




    // this is for user name 

    if (usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    const checkUsernameAvailability = async (usernameValue) => {
        try {
            const response = await fetch('/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameValue }),
            });
            const data = await response.json();
            return data.available; // Assuming the server responds with an object containing a boolean 'available' field
        } catch (error) {
            console.error('Error checking username availability:', error);
            return false;
        }
    };
    
    const validateUsername = async () => {
        const usernameValue = username.value.trim();
    
        if (usernameValue === '') {
            setError(username, 'Username is required');
            return false;
        }
    
        // Check username availability
        const isAvailable = await checkUsernameAvailability(usernameValue);
    
        if (isAvailable) {
            setSuccess(username, 'Username is available');
        }
    
        setSuccess(username);
        return true;
    };
    
    username.addEventListener('blur', validateUsername); // Check username availability when the field loses focus
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const isUsernameValid = await validateUsername();
    
        if (!isUsernameValid) {
            return; // Prevent form submission if username is not valid
        }
    
        // Continue with other form validations and submission
        validateInputs();
        // Check if all fields are successful
        if (document.querySelectorAll('.input-control.success').length === 7) { // Assuming there are 7 input fields
            showPopup(); // Show the success popup
        }
    });
    



    // this is for email 
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }


    // Email confirmation validation
    if (emailConfirmValue === '') {
        setError(emailConfirm, 'Please confirm your email');
    } else if (emailConfirmValue !== emailValue) { // Step 3: Compare email confirmation with the original email
        setError(emailConfirm, 'Email confirmation does not match');
    } else {
        setSuccess(emailConfirm);
    }


    // this is for password 
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;


    
    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    }else if (passwordValue.length > 16 ) {
        setError(password, 'Password must be less than 16 character.')
    }else if (!passwordValue.match(lowerCaseLetters)) {
        setError(password, 'Password must have some lowercase');
    }else if (!passwordValue.match(upperCaseLetters)) {
        setError(password, 'Password must have some uppercase');
    }else if (!passwordValue.match(numbers)) {
        setError(password, 'Password must have some numbers');
    }else if (!passwordValue.match(special)) {
        setError(password, 'Password must have some Special Character');
    } else {
        setSuccess(password);
    }

    



    // this is for phone number
    // Phone number validation regular expressions for different countries
const phoneRegexUS = /^\+?1?[2-9]\d{2}[2-9](?!11)\d{6}$/; // For US
const phoneRegexIN = /^\+?91?[2-9]\d{2}[2-9](?!11)\d{6}$/; // For India
const phoneRegexUK = /^\+?44[2-9]\d{2}\d{6}$/; // For UK
// Add more regular expressions for other countries as needed

// Check if phone value matches any of the regex patterns
if (phoneValue === '') {
    setError(phone, 'Phone number is required');
} else if (!phoneRegexUS.test(phoneValue) && !phoneRegexIN.test(phoneValue) && !phoneRegexUK.test(phoneValue)) {
    setError(phone, 'Please provide a valid phone number for your country');
} else {
    setSuccess(phone);
}








    // Date of Birth validation
// Date of Birth validation
const dob = document.getElementById('dob');
const dobValue = dob.value.trim();

if (dobValue === '') {
    setError(dob, 'Date of Birth is required');
} else {
    const today = new Date();
    const dobDate = new Date(dobValue);
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (dobDate > eighteenYearsAgo) {
        setError(dob, 'You must be at least 18 years old');
    } else {
        setSuccess(dob);
    }
}




};



let capcha = document.getElementById("captcha");
let capchainp = document.getElementById("cap");

let generateRandomCode = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 4; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
};



let validateCaptcha = () => {
    let userInput = capchainp.value.trim();
    let generatedCaptcha = capcha.innerText.trim();

     if (userInput !== generatedCaptcha) {
        setError(capchainp, 'Invalid captcha');
    } else {
        setSuccess(capchainp);
    }
};

// Initial CAPTCHA generation
let initialCaptcha = generateRandomCode();
capcha.innerText = initialCaptcha;

// Event listener for CAPTCHA validation
capchainp.addEventListener('input', validateCaptcha);


  

    
