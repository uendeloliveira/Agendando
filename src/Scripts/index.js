firebase.auth().onAuthStateChanged(user => {
    if (user) {
        $('#calendarIMG').hide()
        $('#calendar').show()
        $('#login,#logout').toggleClass("hide")
    }
});

// LOGIN

function login(){
    location.href = "./login.html";
}