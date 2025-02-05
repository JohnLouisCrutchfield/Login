/*
Don't really need this as we aren't really displaying any data.
function parseJwt(token){

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodedURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
    return JSON.parse(jsonPayload);

}

const { data : user } = parseJwt(accessToken)
*/

// initialization

const accessToken = localStorage.getItem('accessToken')

if(!accessToken) {
    window.location.href ='/login'
}


