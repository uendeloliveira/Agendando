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
    var confirmSenha = document.getElementById('confirmPassword').value;
    if(confirmSenha == registerSenha){
    firebase.auth().createUserWithEmailAndPassword(
            registerEmail, registerSenha
    ).then(() => {
        location.href = "./agenda.html"
    }).catch(error => {
        console.log(error.code)
        if (error.code == "auth/invalid-email"){
            $('#erro6').show()
            $('#erro7').hide()
            $('#erro8').hide()
        } else if (error.code == "auth/email-already-in-use"){
            $('#erro6').hide()
            $('#erro7').show()
            $('#erro8').hide()
        } else if (error.code == "auth/weak-password"){
            $('#erro6').hide()
            $('#erro7').hide()
            $('#erro8').show()
        }else{
            $('#erro9').show()
            console.log(error.code)
        }
    })  
    }else{
        $('#erro109').show()
    } 
}

function recuperarSenha(){
    var loginEmail = document.getElementById('login').value;
    firebase.auth().sendPasswordResetEmail(loginEmail)
    .then(()=>{
        $('#recoverPassword').show()
        console.log('Email enviado')
    }).catch(error => {
        if (error.code == "auth/user-not-found"){
            $('#erro1').show()
            $('#erro2').hide()
            $('#erro3').hide()
        }else if(error.code == "auth/missing-email"){
            $('#erro1').hide()
            $('#erro2').hide()
            $('#erro3').hide()
            $('#erro5').show()
        }else{
            $('#erro1').hide()
            $('#erro2').hide()
            $('#erro3').hide()
            $('#erro4').show()
            $('#erro5').hide()
            console.log(error.code)
        }
    })
}
function mostrarSenha() {
    var tipo = document.getElementById("password");
    var eye = document.getElementById('eye')
    if(tipo.type == "password"){
        eye.classList.add('fa-eye-slash')
        eye.classList.remove('fa-eye')
        tipo.type = "text";
    }else{
        eye.classList.remove('fa-eye-slash')
        eye.classList.add('fa-eye')
        tipo.type = "password";
    }
}
function mostrarSenha1(){
    var tipo1 = document.getElementById("newPassword");
    var eye1 = document.getElementById('eye1')
    if(tipo1.type == "password"){
        eye1.classList.add('fa-eye-slash')
        eye1.classList.remove('fa-eye')
        tipo1.type = "text";
    }else{
        eye1.classList.remove('fa-eye-slash')
        eye1.classList.add('fa-eye')
        tipo1.type = "password";
    }
}
function mostrarSenha2(){
    var tipo2 = document.getElementById("confirmPassword");
    var eye2 = document.getElementById('eye2')
    if(tipo2.type == "password"){
        eye2.classList.add('fa-eye-slash')
        eye2.classList.remove('fa-eye')
        tipo2.type = "text";
    }else{
        eye2.classList.remove('fa-eye-slash')
        eye2.classList.add('fa-eye')
        tipo2.type = "password";
    }
}
function reload(){
    location.href = './index.html'
}