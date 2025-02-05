
const locationPath = window.location.pathname // returns the pathname of the currentpage
let accessToken = localStorage.getItem('accessToken');

if(accessToken) {
    localStorage.removeItem('accessToken')
    accessToken = null
}

if(locationPath === '/login'){
const login = document.getElementById('login')
login.addEventListener('submit', (event) => {
    event.preventDefault(); //stops default event from happening, i.e clicking the submit button
    const username = event.target.username.value;
    const password = event.target.password.value;



fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
        'Content-Type' : 'application/json'
},
body: JSON.stringify({
    username,
    password,
    email
    })
})

.then(response => {
    if(response.status !== 200) {
        throw new Error("Invalid credentials")
    }
    return response.json()
})

.then(({accessToken}) => {
    localStorage.setItem('accessToken', accessToken);
    res.render('index')
})
.catch(error => {
    alert(error);
})
});

}

//sign up

if(locationPath === 'signup'){
    
const signupForm = document.getElementById('signup');
signupForm.addEventListener('submit', (event) => {
event.preventDefault();
const username = event.target.username.value;
const password = event.target.password.value;
const email = event.target.email.value;

fetch('http://localhost:8080/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'

},
body: JSON.stringify({
    username,
    email,
    password
})
})

.then(response => {
    if(response.status !== 200) {
        throw new Error("Error while registering the user")
    }
    return response.json()
})
.then(({accessToken}) => {
    localStorage.setItem('accessToken', accessToken);
    window.location.href = '/';
})
.catch(error => {
    alert(error);




} )
});
}


