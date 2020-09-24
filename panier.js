let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
let Panier = JSON.parse(localStorage.getItem('panier'));
let conteneurPanier = document.getElementById('recap');

let Facture = [];

if(localStorage.getItem('panier') === null){
    conteneurPanier.appendChild(document.createElement('p')).innerText = 'votre panier et vide'
}else{

    conteneurPanier.appendChild(document.createElement('table')).setAttribute('id', 'tableaux');
    let tableaux = document.getElementById('tableaux');

    tableaux.appendChild(document.createElement('tr')).setAttribute('id', 'description');
    document.getElementById('description').appendChild(document.createElement('th')).innerText = 'id element';
    document.getElementById('description').appendChild(document.createElement('th')).innerText = 'nom'
    document.getElementById('description').appendChild(document.createElement('th')).innerText = 'quantiter'
    document.getElementById('description').appendChild(document.createElement('th')).innerText = 'prix unitaire'
    document.getElementById('description').appendChild(document.createElement('th')).innerText = 'total par objet'

    for(i = 0; i<Panier.length; i++){
        let elementEnCours = dataMeuble[Panier[i].name]
        let totalPrice = elementEnCours.price * Panier[i].quantiter
        document.getElementById('tableaux').appendChild(document.createElement('tr')).setAttribute('id', elementEnCours._id);
        let ligneEnCours = document.getElementById(elementEnCours._id);
        ligneEnCours.appendChild(document.createElement('td')).innerText = elementEnCours._id;
        ligneEnCours.appendChild(document.createElement('td')).innerText = elementEnCours.name;
        ligneEnCours.appendChild(document.createElement('td')).innerText = Panier[i].quantiter;
        ligneEnCours.appendChild(document.createElement('td')).innerText = elementEnCours.price + '€';
        ligneEnCours.appendChild(document.createElement('td')).innerText = totalPrice + '€';
        
        Facture.push(totalPrice);

        ligneEnCours.appendChild(document.createElement('td')).setAttribute('id', i);
        document.getElementById(i).innerText = 'delet'
        let delet = i;
        document.getElementById(i).addEventListener('click', function(){
            tableaux.removeChild(document.getElementById(elementEnCours._id));
            totalFacture = totalFacture - totalPrice;
            if(totalFacture === 0){
                let p = document.createElement('p')
                conteneurPanier.replaceChild(p, tableaux);
                p.innerText = "votre panier a bien etait vide";
                localStorage.removeItem('panier');
                conteneurPanier.removeChild(document.getElementById('deletPanier'));
            }else{
                document.getElementById('tbTotal').innerText = totalFacture;
                Panier.splice(delet, delet--);
                console.log(Panier);
                let update = JSON.stringify(Panier);
                localStorage.setItem('panier', update);
            }
        })
    }

    let totalFacture = 0;

    for( let i = 0; i<Facture.length; i++){
        totalFacture = totalFacture + Facture[i];
    }

    tableaux.appendChild(document.createElement('tr')).setAttribute('id', 'total');
    for(let i = 0;  i<3; i++){
        document.getElementById('total').appendChild(document.createElement('td'))
    }
    
    document.getElementById('total').appendChild(document.createElement('td')).innerText = 'total commande';
    let tbTotal = document.createElement('td');
    document.getElementById('total').appendChild(tbTotal).setAttribute('id', 'tbTotal');
    tbTotal.innerText = totalFacture + "€"


    conteneurPanier.appendChild(document.createElement('button')).setAttribute('id', 'deletPanier');
    document.getElementById('deletPanier').innerText = 'vide le panier';
    document.getElementById('deletPanier').addEventListener('click', function(){
        let p = document.createElement('p')
        conteneurPanier.replaceChild(p, tableaux);
        p.innerText = "votre panier a bien etait vide";
        localStorage.removeItem('panier');
        conteneurPanier.removeChild(document.getElementById('deletPanier'));
    })
}

let a = document.createElement('a');
conteneurPanier.appendChild(a).setAttribute('href', './index.html');
a.innerText = "reprendre les achat";



let fd;
let produitComander;
class requet {
    constructor(contact, products){
        this.contact = contact;
        this.products = products;
    }}

let form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {

    if(localStorage.getItem('panier') === null){
        alert("votre panier et vide")
    }else{
        fd = {};

        event.preventDefault();
        new FormData(form);
    
        let data = new FormData(form);
        for (const [key, value] of data.entries()) {
            fd[key] = value
        }
    
        produitComander = [];
        for(i = 0; i<Panier.length; i++){
            produitComander.push(dataMeuble[Panier[i].name]._id)
        }
        
        console.log(produitComander);
        console.log(new requet(fd, produitComander))
        console.log(JSON.stringify(new requet(fd, produitComander)))
        
        Post();
        };
})

let repComande
const Post = async function(){
    let reponse = await fetch('http://localhost:3000/api/furniture/order',{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(new requet(fd, produitComander))
    });
    if(reponse.ok){
        repComande = await reponse.text();
        localStorage.setItem('reponseCommande', repComande)
        location.href = "./remerciment.html"
    }else{
        console.log(reponse)
    }
}

