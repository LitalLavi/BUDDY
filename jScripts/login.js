function clickOnLoginBtn() {

    //משתנה לשמירת נתוני המשתמשים
    let users;

    $.ajax({
        method: "GET",
        url: 'Handlers/Handler.ashx', //קריאה לקובץ הבקשה
        data: { action: "getAllUsers", email: document.querySelector('.email').value, password: document.querySelector('.password').value} // סוג השיטה
    })
        .done(function (data) {
            //debugger

            if (data) {
              
                let userData = JSON.parse(data);
                let puppyBirthDate = userData['Table'][0].puppyBirthDate;

                var months;
                months = (new Date().getFullYear() - new Date(puppyBirthDate).getFullYear()) * 12;
                months -= new Date(puppyBirthDate).getMonth();
                months += new Date().getMonth();
                var puppyAgeInMonths =  months <= 0 ? 0 : months;

                //set max age (cookie expiration date) to 18 months minus puppy age in months 
                document.cookie = data + "; max-age=" + (18 - puppyAgeInMonths) * 30 *24 * 60 * 60;
                window.location.href = "profile.html";
            }
            else {
                document.getElementById('errorMsg').innerText = "אופס, שם משתמש או סיסמא לא תקינים";

            }
      
        })
        //במידה והעמוד לא נטען
        .fail(function () {
            alert("error");
        })

}


$('input').focus(function () {
    $(this).parents('.form-group').addClass('focused');
});

$('input').blur(function () {
    var inputValue = $(this).val();
    if (inputValue == "") {
        $(this).removeClass('filled');
        $(this).parents('.form-group').removeClass('focused');
    } else {
        $(this).addClass('filled');
    }
})  