const API_LINK = 'http://localhost:5000/api/sign-up'


document.getElementById('sign-up-sign-in').addEventListener('submit', async ( event )=> {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    // console.log(name);
    // console.log(password);
    try {
        const response = await fetch(API_LINK, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        });
        console.log(response)
        const data = await response.json();
        if (response.ok) {
            document.getElementById('signup-message').innerText = 'Signup successful!';
        }
        else {
            document.getElementById('signup-message').innerText = 'Signup failed!' || data.message;
        }
    }
    catch (err) {
        // console.error( 'Error during signup:', err);
        document.getElementById('signup-message').innerText = 'An error occured during signup.';
    }
})
