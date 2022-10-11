firebase.auth().onAuthStateChanged(user => {
    if (user) {
        location.href = "./agenda.html"
    }
})
function login() {
    var loginEmail = document.getElementById('login').value;
    var loginSenha = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(
        loginEmail, loginSenha
    ).then(() => {
        location.href = "./agenda.html"
    }).catch(error => {
        if (error.code == "auth/user-not-found"){
            $('#erro1').show()
            $('#erro2').hide()
            $('#erro3').hide()
        }
        else if (error.code == "auth/invalid-email"){
            $('#erro1').hide()
            $('#erro2').show()
            $('#erro3').hide()
        }
        else if (error.code == "auth/wrong-password"){
            $('#erro1').hide()
            $('#erro2').hide()
            $('#erro3').show()
        }
        else{
            $('#erro1').hide()
            $('#erro2').hide()
            $('#erro3').hide()
            $('#erro4').show()
            console.log(error.code)
        }
    });
}
$('.toRegister,.back').click(() =>{
    $('.form').toggleClass("hide");
})
function register(){
    var registerEmail = document.getElementById('email').value;
    var registerSenha = document.getElementById('newPassword').value;
    firebase.auth().createUserWithEmailAndPassword(
        registerEmail, registerSenha
    ).then(() => {
        location.href = "./agenda.html"
    }).catch(error => {
        console.log(error.code)
        if (error.code == "auth/invalid-email"){
            $('#erro5').show()
            $('#erro6').hide()
            $('#erro7').hide()
        } else if (error.code == "auth/email-already-in-use"){
            $('#erro5').hide()
            $('#erro6').show()
            $('#erro7').hide()
        } else if (error.code == "auth/weak-password"){
            $('#erro5').hide()
            $('#erro6').hide()
            $('#erro7').show()
        }else{
            console.log(error.code)
        }
    })    
}

function recuperarSenha(){
    var loginEmail = document.getElementById('login').value;
    firebase.auth().sendPasswordResetEmail(loginEmail)
    .then(()=>{
        
        console.log('Email enviado')
    }).catch(error => {
        if (error.code == "auth/user-not-found"){
            $('#erro1').show()
            $('#erro2').hide()
            $('#erro3').hide()
        }else{
            console.log(error.code)
        }
    })
}