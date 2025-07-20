const API_LINK = 'https://localhost:5000/api/signup'


document.getElementById('signup-form').addEventListener('submit', async ( event )=> {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const response = fecth(API_LINK, {
        method: POST,
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({username: name, email: email, number: number})
    });
    const data = await response.json();
    if (response.ok) {
        document.getElementById('signup-message').innerText = 'Signup successful!';
    }
    else {
        document.getElementById()
    }
}
)

const 

console.log(name)