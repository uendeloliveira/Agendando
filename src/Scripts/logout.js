// firebase.auth().onAuthStateChanged(user => {
//     if (!user) {
//         location.href = "./index.html"
//     }
//     // return findTransactions(user);
// })
function logout () {
    location.href = "./index.html"
//     firebase.auth().signOut().then(() =>{
//         location.href = ""
//     }).catch(() => {
//         alert('Error ao fazer logout')
//     })
}