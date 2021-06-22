$('document').ready(function () {

    //check if user already logged in , if not - redirect to login page
    if (document.cookie == "" || document.cookie == undefined) {
        window.location.href = "login.html";
        return;
    }

    //get cookie
    let userCookie = JSON.parse(document.cookie);

    //set userName
    let userName = userCookie['Table'][0].firstName;
    document.getElementById('helloUserName').innerText = "היי " + userName +",";

    //set puppy age
    let puppyBirthDate = userCookie['Table'][0].puppyBirthDate;
    let puppyAge = monthDiff(new Date(puppyBirthDate), new Date());
    document.getElementById('puppyAgeValue').innerText = puppyAge + " חודשים";

    //set puppy name for all elements with puppyNameValue class attribute 
    let puppyName = userCookie['Table'][0].puppyName;
    var elements = document.getElementsByClassName("puppyNameValue");
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerText = puppyName;
    }
});

//calc puppy age
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

