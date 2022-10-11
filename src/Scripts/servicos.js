firebase.auth().onAuthStateChanged(user => {
    if (user) {
        criarServico()
        listaServicos(user)
    } else {
        location.href = "./index.html";
    }
});

// FORMULÁRIO PARA CADASTRO DE SERVIÇOS

const form = {
    servico: () => document.getElementById('servico'),
    valor: () => document.getElementById('valor'),
}
function criarServico() {
    return {
        servico: {
            tratamento: form.servico().value,
            valor: parseFloat(form.valor().value),
        }, 
        user: {
            uid: firebase.auth().currentUser.uid
        },
    };
}

// CADASTRANDO SERVIÇOS

function cadastrarServico() {
    const servico  = criarServico();

    
    firebase.firestore()
    .collection('Serviços')
        .add(servico)
        .then(() => {
            location.href = "./servicos.html"
        })
    }
    
// CHAMANDO SERVIÇOS CADASTRADOS
    
function listaServicos(user) {
    firebase.firestore()
        .collection('Serviços')
        .where('user.uid', '==', user.uid)
        .orderBy('servico')
        .get()
        .then(snapshot => {
            servicos = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id

                
            }));
            listaServico(servicos)
            console.log(servicos)
    })
}

// LISTA DE SERVIÇOS CADASTRADOS

function listaServico(servicos) {
    const lista = document.getElementById('servicos')
    
    servicos.forEach(servico => {

        const li = document.createElement('li')
        li.classList.add('listaServicos')
        li.id = servico.uid
        
        const servicos = document.createElement('h3')
        servicos.innerHTML = servico.servico.tratamento
        li.appendChild(servicos)

        const servicosLista = document.createElement('p')
        servicosLista.innerHTML = ' R$: ' + servico.servico.valor.toFixed(2)
        li.appendChild(servicosLista)
        
        lista.appendChild(li)

        
    })
}


// BOTÃO NOVO SERVIÇO

$("#add-servico-btn").click(() =>{
    $('#servicosTitle,[key = 1],.novo-servico-btn,.voltar-servico-btn,[key = 2],.title').toggleClass("hidden");
});