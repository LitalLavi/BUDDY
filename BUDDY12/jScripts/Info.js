$('document').ready(function () {

    //check if user already logged in , if not - redirect to login page
    if (document.cookie == "" || document.cookie == undefined) {
        window.location.href = "login.html";
        return;
    }
})