// VERIFICAR SE ESTÁ LOGADO

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        listaUsuarios(user)
        criarCliente()
        $('#calendarIMG').hide()
        $('#calendar').show()
        $('#login,#logout').toggleClass("hide")
    }
});

// LOGIN

function login(){
    location.href = "./login.html";
}

// FORMULÁRIO

const form = {
    cliente: () => document.getElementById('cliente'),
    atendente: () => document.getElementById('atendente'),
    telefone: () => document.getElementById('telefone'),
    description: () => document.getElementById('description'),
    date: () => document.getElementById('data'),
    hora: () => document.getElementById('hora'),
}

// CHAMANDO Usuarios CADASTRADOS

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
        selectUsuario(usuarios)     
            
    })
}

// AGENDAR CLIENTE

$('#salvarCliente').click(() =>{
    agendarCliente()
})

function agendarCliente() {
    const cliente  = criarCliente();

    salvar(cliente)
    
}

function salvar(paciente){
    firebase.firestore()
    .collection('Clientes')
    .add(paciente)
    .then(() => {
        location.href = "./agenda.html"
        // alert('agendou')
    })
}

// LISTA DE USUARIOS

function selectUsuario(Usuarios) {

    const selectAtendente = document.getElementById('atendente')


    Usuarios.forEach(Usuario => {

        const optionAgendamento = document.createElement('option')
        optionAgendamento.innerHTML = Usuario.atendente
        optionAgendamento.value = Usuario.atendente

        selectAtendente.appendChild(optionAgendamento)
    })
}
// FORMATAR DATA

function formatDate() {
    return new Date(form.date().value).toLocaleDateString('en-us', {timeZone: 'GMT'});
}


// FORMULÁRIO PARA SALVAR NO FIREBASE

function criarCliente() {
    return {
                cliente: form.cliente().value,
                atendente: form.atendente().value,
                telefone: form.telefone().value,
                description: form.description().value,
                date: formatDate(),
                hora: form.hora().value,
                color: '#2994d1',
                servico: [
                    {}              
                ],
                user: {
                    uid: firebase.auth().currentUser.uid
                },
                type: "Agendado",
            };
}

// VOLTAR PARA AGENDA

$(".back-schedule").click(() =>{
    location.href = './agenda.html'
});


// MASCARAS INPUT

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