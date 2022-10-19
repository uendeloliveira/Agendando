// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         criarUsuario()
//         listaUsuarios(user)
//     } else {
//         location.href = "./index.html";
//     }
// });
criarUsuario()
listaUsuarios()
// FORMULÁRIO PARA CADASTRO DE USUARIOS

const form = {
    atendente: () => document.getElementById('atendente'),
    email: () => document.getElementById('email'),
    telefone: () => document.getElementById('telefone'),
    endereco: () => document.getElementById('endereco')
}
function criarUsuario() {
    return {
        atendente: form.atendente().value,
        email: form.email().value,
        telefone: form.telefone().value,
        endereco: form.endereco().value,
        user: {
            uid: firebase.auth().currentUser.uid
        },
    };
}

// CADASTRANDO USUARIOS

function cadastrarUsuario() {
    const usuario  = criarUsuario();

    
    firebase.firestore()
    .collection('Usuarios')
        .add(usuario)
        .then(() => {
            location.href = "./usuario.html"
        })
    }
    
// CHAMANDO USUARIOS CADASTRADOS
    
function listaUsuarios(user) {
    firebase.firestore()
        .collection('Usuarios')
        .where('user.uid', '==', user.uid)
        .orderBy('atendente')
        .get()
        .then(snapshot => {
            usuarios = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id

                
            }));

        listaUsuario(usuarios)

        $("#add-usuario-btn").click(() =>{
            $('#usuariosTitle,[key = 1],.novo-usuario-btn,.voltar-usuario-btn,[key = 2],.usuarios').toggleClass("hide");
        });

    })
}

// LISTA DE USUARIOS CADASTRADOS

function listaUsuario(usuarios) {
    const lista = document.getElementById('usuarios')
    
    usuarios.forEach(usuario => {
        const li = document.createElement('li')
        li.classList.add('listaUsuarios')
        li.id = usuario.uid
        li.addEventListener('click', ()=>{
            // console.log(usuario.atendente)
        })
        
        
        const atendente = document.createElement('h3')
        atendente.innerHTML = usuario.atendente
        li.appendChild(atendente)

        const email = document.createElement('p')
        email.innerHTML = usuario.email
        li.appendChild(email)
        
        const telefone = document.createElement('p')
        telefone.innerHTML = 'Telefone: ' + usuario.telefone
        li.appendChild(telefone)
        
        const endereco = document.createElement('p')
        endereco.innerHTML = 'Endereço: ' + usuario.endereco
        li.appendChild(endereco)

        lista.appendChild(li)

        // REMOVER USUÁRIO

        const remover = document.createElement('button')
        remover.id = 'excluirUsuario'
        remover.classList.add('removerUsuario')
        li.appendChild(remover)
        remover.addEventListener('click', ()=>{
            askRemover = document.getElementById('askRemover')
            askRemover.classList.remove('hide')
            
            $('#sim').click(()=>{
                firebase.firestore()
                .collection('Usuarios')
                .doc(usuario.uid)
                .delete()
                .then(() => {
                    location.href = './usuario.html'
                })
            })
        })
        
        const nao = document.getElementById('nao')
        nao.addEventListener('click', ()=>{
            askRemover.classList.add('hide')
        })
        
        
    })
}



// MASCARA CONTATO

$(document).ready(function(){
    $('#telefone').mask("(99) 9999-99999")
    .focusout(function (event) {  
        var target, phone, element;  
        target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
        phone = target.value.replace(/\D/g, '');
        element = $(target);  
        element.unmask();  
        if(phone.length > 10) {  
            element.mask("(99) 99999-9999");  
        } else {  
            element.mask("(99) 9999-9999");  
        }  
    });
})