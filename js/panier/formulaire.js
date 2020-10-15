//fonction pour la recuperation des donne du formulaire pour l'envoyer au serveur
const RecupObjetFormulaire = function(form){
    let fd = {};
            new FormData(form);
        
            let data = new FormData(form);
            for (const [key, value] of data.entries()) {
                fd[key] = value
            }
            return fd
}

const TableauidCommande = function(dataPanier, panier){
    produitComander = [];
    for(let i = 0; i<dataPanier.length; i++){
        let element = dataPanier[i]._id
        for(let a =0 ; a<panier[i].quantiter; a++){
            produitComander.push(element)
        }
    }
    return produitComander
}

//toute les fonction de verification js pour le formulaire
const verifMot = function(input){
    let verif = /[\d \W]/
    if(verif.test(input.value) === true){
        return false
    }else{
        return true
    }
} 
const verifAdress = function(input){
let verif = /[\d]/
if(verif.test(input.value) === true){
    return false
}else{
    return true
}
}
const verifVille = function(input){
let verif = /[\d]/
if(verif.test(input.value) === true){
    return false
}else{
    return true
}
}
const verifEmail = function(value){
let verif = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
return verif.test(value)
 
}

const verifFinalFormulaire = function(contenue){
let input = document.forms.myForm;
let rep = true
for(let i = 0; i<input.length; i++){
    if(!input[i].value){
        rep = false
    }
}
if(rep === true){
    let prenom = verifMot(input.firstName.value);
    let nom = verifMot(input.lastName.value);
    let address = verifAdress(input.address.value);
    let city = verifVille(input.city.value);
    let email = verifEmail(input.email.value)
        if(prenom === true && nom === true && address === true && city === true && email === true){
            return true
        }else{
            return "veuille bien remplir les champs"
        }
    }else{
        return "veuille remplir tout les champs"
    }
}

//l'action que l'on voulu au onchange sur les inpute du form
const ActionInpute = function(id, rep){
    if(rep === true){        
        if(id.classList.contains("bad") === true){
            id.classList.remove("bad")
        }
    }else{
        id.classList.add("bad")
    }
    }

//toute les action lier au inpute
document.getElementById('prenom').addEventListener('change',function(){
let rep = verifMot(this)
prenom = ActionInpute(this, rep)
})
document.getElementById('nom').addEventListener('change',function(){
let rep = verifMot(this)
nom = ActionInpute(this, rep)
})
document.getElementById('adress').addEventListener('change',function(){
let rep = verifAdress(this)
adress = ActionInpute(this, rep)
})
document.getElementById('ville').addEventListener('change',function(){
let rep = verifVille(this)
vill = ActionInpute(this, rep)
})
document.getElementById('email').addEventListener('change',function(){
let rep = verifEmail(this.value)
email = ActionInpute(this, rep)
})


//fonction final pour envoyer le fomulaire
let form = document.getElementById("myForm");
let panier = JSON.parse(localStorage.getItem('panier'))

form.addEventListener("submit", function (event) {
    class requet {
        constructor(contact, products){
            this.contact = contact;
            this.products = products;
        }}    
    
    event.preventDefault();

    if(localStorage.getItem('panier') === null){
        alert("votre panier et vide")
    }else{
        let verifJS = verifFinalFormulaire("myForm")
        if(verifJS === true){
            let fd = RecupObjetFormulaire(form)
            
            let produitComander = TableauidCommande(dataMeuble, panier);

            Post(new requet(fd,produitComander), "./remerciment.html");
        }else{
            alert("la double validation n'est pas correct" + verifJS)
        }
    };
})