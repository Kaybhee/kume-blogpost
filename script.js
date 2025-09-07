const API_LINK = 'http:localhost:5000/api/'


document.getElementById('sign-up-sign-in').addEventListener('submit', async ( event )=> {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    // console.log(name);
    // console.log(password);
    try {
        const response = await fetch(API_LINK + 'sign-up', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        });
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            document.getElementById('signup-message').innerText = 'Signup successful!';
            document.getElementById('signup-message').style.color = "green";
        }
        else {
            document.getElementById('signup-message').innerText = data.message;
            document.getElementById('signup-message').style.color = "red";

        }
    }
    catch (err) {
        // console.error( 'Error during signup:', err);
        document.getElementById('signup-message').innerText = 'An error occured during signup.';
    }
})
