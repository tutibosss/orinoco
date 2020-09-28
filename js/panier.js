//recuperation des donne pour la conceeption de la page
let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
let Panier = JSON.parse(localStorage.getItem('panier'));
let conteneurPanier = document.getElementById('recap');

let Facture = [];

//fonction de creation du tableau avec son entete
const CreeTableauRecapComande = function(conteneur, id, arrayTitreColone,){
    let tableaux = conteneur.appendChild(document.createElement('table'))
    tableaux.setAttribute('id', id);
    let head = document.getElementById(id).appendChild(document.createElement('thead'))
    head.appendChild(document.createElement('tr')).setAttribute('id', 'description');
    for(let i = 0 ; i<arrayTitreColone.length; i++){
        document.getElementById('description').appendChild(document.createElement('th')).innerText = arrayTitreColone[i];
    }
}

//fonction pour le calcule du prix de chaque ligne du tableau
const calculePrixQuantiter = function(prix, quantiter){
    return prix*quantiter
}

//fonction pour cree le contenue de chaque ligne du body du tableau
const creeLigneContenueTableau = function(conteneur, idLigne, dataAffiche,){
    conteneur.appendChild(document.createElement('tr')).setAttribute('id', idLigne);
    
    for(let i=0; i<dataAffiche.length; i++){
        document.getElementById(idLigne).appendChild(document.createElement('td')).innerText = dataAffiche[i]
    }
}

//fonction pour la creation du foot du tableau
CreeTfootTableaux = function(tableaux, colspan, nomClassColspan, text_a_affiche, prixAffiche){
    tableau = document.getElementById(tableaux)
    tableau.appendChild(document.createElement('tfoot')).setAttribute('id', 'tfoot');
    document.getElementById('tfoot').appendChild(document.createElement('tr')).setAttribute('id', 'total');
    let tbDescript = document.getElementById('total').appendChild(document.createElement('td'));
    tbDescript.setAttribute('colspan', colspan)
    tbDescript.classList.add(nomClassColspan);
    tbDescript.innerText = text_a_affiche;
    let tbTotal = document.createElement('td');
    document.getElementById('total').appendChild(tbTotal).setAttribute('id', 'tbTotal');
    tbTotal.innerText = prixAffiche
}

//fabrication du recapitulatif de la commande ci le panier n'est pas vide
if(localStorage.getItem('panier') === null){
    conteneurPanier.appendChild(document.createElement('p')).innerText = 'votre panier et vide'
}else{
    
    //creation de du tableau avec son entete
    let Entete = ["id element", "nom", "quantiter", "prix unitaire", "total par objet"];
    CreeTableauRecapComande(conteneurPanier,"tableaux", Entete)
    
    //creation du contenue du tableaux
    let tableaux = document.getElementById('tableaux').appendChild(document.createElement('tbody'))
    
    for(i = 0; i<Panier.length; i++){

        let elementEnCours = dataMeuble[Panier[i].name]
        
        let totalLigne = calculePrixQuantiter(elementEnCours.price, Panier[i].quantiter)
        Facture.push(totalLigne);

        let dataLigne = [elementEnCours._id, elementEnCours.name, Panier[i].quantiter,elementEnCours.price + '€',totalLigne+'€']

        creeLigneContenueTableau(tableaux, elementEnCours._id, dataLigne);

        //ajout de la possibliter de suprimer chaque ligne
        let deletLigneTableaux = function(){
            tableaux.removeChild(document.getElementById(elementEnCours._id));
            totalFacture = totalFacture - totalLigne;
            let delet = i;
            if(totalFacture === 0){
                deletPanier();
            }else{
                document.getElementById('tbTotal').innerText = totalFacture;
                Panier.splice(delet, delet--);
                console.log(Panier);
                let update = JSON.stringify(Panier);
                localStorage.setItem('panier', update);
            }
        }

        document.getElementById(elementEnCours._id).appendChild(document.createElement('td')).setAttribute('id',"delet"+i);
        creeBouton(document.getElementById("delet"+i), i, "deletPanier", 'click', deletLigneTableaux)
    }

    //calcule du total de la facture

    let totalFacture = calculeFacture(Facture)

    //creation du foot du tableau
    CreeTfootTableaux ('tableaux', Entete.length-1, 'droit', 'total de la comande',  totalFacture + "€")

    // ajout du boutton pour vide totalement le panier et suprime le tableau
    const deletPanier = function(){
        let p = document.createElement('p')
        conteneurPanier.replaceChild(p, document.getElementById('tableaux'));
        p.innerText = "votre panier a bien etait vide";
        localStorage.removeItem('panier');
        conteneurPanier.removeChild(document.getElementById('deletPanier'));
    }
    creeBouton(conteneurPanier,'deletPanier','vide le panier', 'click', deletPanier)
}

creeLien(conteneurPanier, "rependreAchat", "./index.html", "reprendre les achat");

//patie Post et traitement reponse

//fonction pour recuperai le formulaire valide directement dans le html
const RecupObjetFormulaire = function(form){
    let fd = {};
            new FormData(form);
        
            let data = new FormData(form);
            for (const [key, value] of data.entries()) {
                fd[key] = value
            }
            return fd
}

//construction du tableau array avec les idee de element choisi
const TableauidCommande = function(dataPanier, data){
    produitComander = [];
    for(i = 0; i<Panier.length; i++){
        let element = data[dataPanier[i].name]._id
        produitComander.push(element)
    }
    return produitComander
}

//envoi de la demande au serveur au clique sur sbmit du formulaire
let form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
    class requet {
        constructor(contact, products){
            this.contact = contact;
            this.products = products;
        }}    

    if(localStorage.getItem('panier') === null){
        alert("votre panier et vide")
    }else{
        event.preventDefault();
        let fd = RecupObjetFormulaire(form)
        
        let produitComander = TableauidCommande(Panier,dataMeuble);

        Post(new requet(fd,produitComander), "./remerciment.html");
        };
})

