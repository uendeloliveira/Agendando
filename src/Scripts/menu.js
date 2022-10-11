// Abrir Menu 
var btnMobile = document.getElementById('menu_btn');

var nav = document.getElementById('nav');
var header = document.getElementById('header');
var title = document.getElementById('title')

function toggleMenu() {
    nav.classList.toggle('active');
    header.classList.toggle('headerColor');
    title.classList.toggle('titleCor')
}

btnMobile.addEventListener('click', toggleMenu);

//Fechar Menu
var fechar = document.querySelectorAll('a[href^="#"]');

fechar.forEach(link => {
    link.addEventListener('click', fecharMenu);
})

function fecharMenu(){
    nav.classList.remove('active');
    header.classList.remove('headerColor');
}