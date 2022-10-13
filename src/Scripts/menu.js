// Abrir Menu 
var btnMobile = document.getElementById('menu_btn');

var nav = document.getElementById('nav');
var header = document.getElementById('header');
var title = document.getElementById('title')

function toggleMenu() {
    nav.classList.toggle('active');
    title.classList.toggle('titleCor');
    header.classList.toggle('headerColor');
    header.style.cssText = 'background-image: none;'
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