//recuperation des donne
let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
let Panier = JSON.parse(localStorage.getItem('panier'));
let conteneurPanier = document.getElementById('recap');

let Facture = [];

//verification que le panier oit bien remplie

if(localStorage.getItem('panier') === null){
    conteneurPanier.appendChild(document.createElement('p')).innerText = 'votre panier et vide'
}else{
    let Entete = ["id element", "nom", "quantiter", "prix unitaire", "total par objet"];
    CreeTableauRecapComande(conteneurPanier,"tableaux", Entete)
    let tableaux = document.getElementById('tableaux').appendChild(document.createElement('tbody'))
    

    for(i = 0; i<Panier.length; i++){

        let elementEnCours = dataMeuble[Panier[i].name]
        
        let totalLigne = calculePrixQuantiter(elementEnCours.price, Panier[i].quantiter)
        Facture.push(totalLigne);

        let dataLigne = [elementEnCours._id, elementEnCours.name, Panier[i].quantiter,elementEnCours.price + '€',totalLigne+'€']

        creeLigneContenueTableau(tableaux, elementEnCours._id, dataLigne);

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

    //calcule du total de la facture et ajout au tableau

    let totalFacture = calculeFacture(Facture)

    CreeTfootTableaux ('tableaux', Entete.length-1, 'droit', 'total de la comande',  totalFacture + "€")

    // ajout du boutton pour vide totalement le panier et suprime le tableau
    const deletPanier = function(){
        let p = document.createElement('p')
        conteneurPanier.replaceChild(p, tableaux);
        p.innerText = "votre panier a bien etait vide";
        localStorage.removeItem('panier');
        conteneurPanier.removeChild(document.getElementById('deletPanier'));
    }
    creeBouton(conteneurPanier,'deletPanier','vide le panier', 'click', deletPanier)

}

creeLien(conteneurPanier, "rependreAchat", "./index.html", "reprendre les achat");

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

