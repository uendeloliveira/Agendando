firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        // location.href = "./index.html"
    }
})
function logout () {
    firebase.auth().signOut().then(() =>{
        location.href = ""
    }).catch(() => {
        alert('Error ao fazer logout')
    })
}