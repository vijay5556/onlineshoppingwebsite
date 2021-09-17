
var getpageContent = (templateUrl) => {
    $.ajax({
        url: templateUrl,
        method: 'GET',
        success: (res) => {
            $("main-container").html('');
            $("main-container").html(res);
        },
        error: (err) => {
            console.log('error');
            console.log(err)
        }
    });
}

var loadPage = (type) => {
    switch (type) {
        case 'login':
            getpageContent('/templates/login.htm')
            break;
        case 'fgpwd':
            getpageContent('/templates/fgpwd.htm')
            break;
        case 'signup':
            getpageContent('/templates/signup.htm')
            break;
        case 'prodDetails':
            // getpageContent('/templates/prodDetails.htm');
            loadProductDetails();
            break;
    }
}



$(document).ready(() => {
    $.ajax({
        url: '/isuserlogin',
        method: 'POST',
        dataType: 'JSON',
        success: (response) => {
            console.log(response);
            if (response.status) { // loggedin user
                loadPage('prodDetails');
            } else { // user not loggedin yet
                loadPage('login');
            }
        },
        error: (error) => {
            console.log(error)
        }
    })

    
});
