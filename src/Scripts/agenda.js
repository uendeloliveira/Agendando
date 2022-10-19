// VERIFICAR SE ESTÁ LOGADO

// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         listaUsuarios(user)
//     } else {
//         location.href = "./index.html";
//     }
// });
listaUsuarios()
// CHAMANDO USUARIOS CADASTRADOS

function listaUsuarios(user) {
    firebase.firestore()
    .collection('Usuarios')
    // .where('user.uid', '==', user.uid)
    .orderBy('atendente')
    .get()
    .then(snapshot => {
        usuarios = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        selectUsuario(usuarios)
        if(usuarios.length == 0){
            location.href = "./usuario.html"
        }

    })
}

// INPUT PARA SELECIONAR USUARIO

function selectUsuario(usuarios) {

    var select = document.getElementById('listaDeUsuarios')

    usuarios.forEach(usuario => {
        const option = document.createElement('option')
        option.innerHTML = usuario.atendente

        select.appendChild(option)
    })
}

// CRIAR CLIENTE NA AGENDA

function abrirAgenda(){

    const selectUsuario = document.querySelector('#listaDeUsuarios')
    const options = selectUsuario.children[selectUsuario.selectedIndex];
    const usuarioSelecionado = options.textContent

    const ID = []
    const Nome = []
    const Atendente = []
    const Hora = []
    const Data = []
    const Description = []
    const Type = []
    const Color = []
    
    firebase.firestore().collection('Clientes')
    .orderBy('hora')
    .get().then((snapshot) => {
            snapshot.forEach((doc) => {

            const clienteID = doc.id
            const clienteNome = doc.data().cliente
            const clienteAtendente = doc.data().atendente
            const clienteHora = doc.data().hora
            const clienteData = doc.data().date
            const clienteDescription = doc.data().description
            const clienteType = doc.data().type
            const clienteColor = doc.data().color

            ID.push(clienteID)
            Nome.push(clienteNome)
            Atendente.push(clienteAtendente)
            Hora.push(clienteHora)
            Data.push(clienteData)
            Description.push(clienteDescription)
            Type.push(clienteType)
            Color.push(clienteColor)
        })

        todosClientes = []
        for (var i = 0; i < ID.length; i++){
            if(usuarioSelecionado == Atendente[i]){
                
                var cliente = 
                {
                    id: ID[i],
                    cliente: Nome[i],
                    atendente: Atendente[i],
                    hora: Hora[i],
                    date: Data[i],
                    description: Description[i],
                    type: Type[i],
                    color: Color[i],
                }

            todosClientes.push(cliente)
            }
        }  
        
        $("#calendar").evoCalendar({
            language: 'pt',
            eventHeaderFormat: 'd  /  MM  /  yyyy',
            format: 'mm/dd/yyyy',
            calendarEvents: todosClientes,
        });
    })
    $('#calendario').load(location.href + ' #calendario')
}

// IR PARA AGENDAMENTO

$(".add-schedule").click(() =>{
    location.href = './agendamento.html'
});