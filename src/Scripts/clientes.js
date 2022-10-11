
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        clienteUID(user)
    } else {
        location.href = "./index.html";
    }
});


function clienteUID(user) {
    firebase.firestore()
    .collection('Clientes')
    .where('user.uid', '==', user.uid)
    .orderBy('cliente')
    .get()
    .then(snapshot => {
        clientes = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        editar(clientes)
    }) 
}
// MOSTRAR DADOS DO CLIENTE
$('[key = 2]').hide()
function editar(clientes){

    $('#buscarCliente-btn').click(() =>{
        const clienteEncontrado = document.getElementById('buscarCliente')    
        const cliente = clientes.find((cliente) => cliente.cliente == clienteEncontrado.value)
        if(cliente){
            $('.buscarCliente-btn,#buscarCliente-again-btn,.buscarCliente-input,#listaClientes').toggleClass("hide");
            console.log(cliente.cliente)
            

            // FORMATAR DATA PARA BR   

            function formatDateToBR() {
                return new Date(cliente.date).toLocaleDateString('pt-br', {timeZone: 'GMT'});
            }
            nome = document.getElementById('cliente')
            atendente = document.getElementById('atendente')
            hora = document.getElementById('hora')
            data = document.getElementById('data')
            telefone = document.getElementById('telefone')
            description = document.getElementById('description')
            type = document.getElementById('type')

            nome.innerHTML = cliente.cliente
            atendente.innerHTML = cliente.atendente
            hora.innerHTML = cliente.hora
            data.innerHTML = formatDateToBR()
            if(cliente.telefone){
                telefone.innerHTML = cliente.telefone
            }
            description.innerHTML = cliente.description
            type.innerHTML = 'Cliente ' + cliente.type
            if(cliente.type == 'Agendado'){
                type.classList.add('blue')
            }else if(cliente.type == 'Confirmado'){
                type.classList.add('green')
            }else if(cliente.type == 'Cancelado'){
                type.classList.add('red')
            }

            // EDITAR DADOS DO CLIENTE

            const editar = document.getElementById('editar')
            editar.addEventListener('click', () =>{
                $('#listaClientes').hide()
                $('[key = 2]').show()

                dbCliente = firebase.firestore().collection('Clientes').doc(cliente.uid)
                divEdit = document.getElementById('listaEdit') 
                nomeEdit = document.getElementById('clienteEdit')
                atendenteEdit = document.getElementById('atendenteEdit')
                horaEdit = document.getElementById('horaEdit')
                dataEdit = document.getElementById('dataEdit')
                telefoneEdit = document.getElementById('telefoneEdit')
                descriptionEdit = document.getElementById('descriptionEdit')
                cancelar = document.getElementById('cancelar')
                confirmar = document.getElementById('confirmar')

                
                nomeEdit.value = cliente.cliente
                atendenteEdit.value = cliente.atendente
                horaEdit.value = cliente.hora

                // O INPUT DATA PRECISA SER CRIADO NO CÓDIGO JAVASCRIPT, CASO CONTRÁRIO, NÃO RECONHECE O VALUE DO INPUT
                dataEdit = document.createElement('input')
                dataEdit.type = 'text'
                dataEdit.onfocus = function(){this.type='date'}
                dataEdit.value = cliente.date
                dataEdit.classList.add('dataEdit')
                listaEdit.appendChild(dataEdit)

                telefoneEdit.value = cliente.telefone
                descriptionEdit.value = cliente.description
                if(cliente.type == 'Confirmado'){
                    confirmar.checked = true
                }else if(cliente.type == 'Cancelado'){
                    cancelar.checked = true
                }
            })

            // REMOVER CLIENTE

            $('#excluirCliente').click(() => {
                $('.askRemover').toggleClass("hide");
            })
            $('#sim').click(()=>{
                removeCliente();
            })
            $('#nao').click(()=>{
                $('.askRemover').toggleClass("hide");
            })
            
            function removeCliente() {
                firebase.firestore()
                    .collection('Clientes')
                    .doc(cliente.uid)
                    .delete()
                    .then(() => {
                        location.href = './clientes.html'
                    })
            }
            
        // }
        }else{
            $('#buscarCliente,#erro,#buscarCliente-btn,#buscarCliente-again-btn').toggleClass('hide')
        }
    })
}


$('#buscarCliente-again-btn').one('click', () =>{
    location.href = './clientes.html'
})
const atualizar = document.getElementById('atualizar')
atualizar.addEventListener('click',() => {
    // FORMATAR DATA    

    function formatDate() {
        return new Date(dataEdit.value).toLocaleDateString('en-us', {timeZone: 'GMT'});
    }
    // VERIFICAR STATUS

    if(cancelar.checked){
        return dbCliente.update({
            cliente: nomeEdit.value,
            atendente: atendenteEdit.value,
            description: descriptionEdit.value,
            telefone: telefoneEdit.value,
            hora: horaEdit.value,
            date: formatDate(),
            type: 'Cancelado',
            color: 'red'
        }).then(()=>{
            location.href = './clientes.html'
        })
    }
    if(confirmar.checked){
        return dbCliente.update({
            cliente: nomeEdit.value,
            atendente: atendenteEdit.value,
            description: descriptionEdit.value,
            telefone: telefoneEdit.value,
            hora: horaEdit.value,
            date: formatDate(),
            type: 'Confirmado',
            color: '#63d867'
        }).then(()=>{
            location.href = './clientes.html'
        })
    }
    else{
        return dbCliente.update({
            cliente: nomeEdit.value,
            atendente: atendenteEdit.value,
            description: descriptionEdit.value,
            telefone: telefoneEdit.value,
            hora: horaEdit.value,
            date: formatDate(),
            type: 'Agendado',
            color: '#2994d1'
        }).then(()=>{
            location.href = './clientes.html'
        })
    }

    
})

// MASCARA CONTATO
$(document).ready(function(){
    $('#telefoneEdit').mask("(99) 9999-99999")
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

