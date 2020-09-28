//recuperation des donne important pour la conception

const dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
const articleID = localStorage.getItem('articleChoisi');
const articleSelet = dataMeuble[articleID]

const conteneur = document.getElementById('detail-article');

//conception de larticle dans le detail

creeArticle(conteneur, articleSelet.name, articleSelet.imageUrl, articleSelet.description, articleSelet.price);

//ajout de la liste d'option
const creeListe = function(conteneur, id, arrayDataListe,){
    conteneur.appendChild(document.createElement('select')).setAttribute('id', id);
    for(i = 0; i < arrayDataListe.length; i++){
    document.getElementById(id).appendChild(document.createElement("option")).innerText = arrayDataListe[i];
    }
}

creeListe(conteneur,"listeOption",articleSelet.varnish);

//Bouton pour l'ajout au panier

//Fonction pour cree le panier si il et vide

const creePanier = function(){
    let Panier = [{
        name: articleID,
        quantiter: 1,
    }]
    localStorage.setItem('panier', JSON.stringify(Panier));
}

//fonction de recherche ci le produit et daja existant dans le panier

const recherche = function (Panier, ID){

    let reponse = {
        value: false,
        idPanier: null
    }
    for(let i = 0; i<Panier.length; i++){
        console.log(ID + Panier[i].name)
        if(ID === Panier[i].name){
            reponse.value = true;
            reponse.idPanier = i;
        }
    }
    return reponse
}

//fonction de modification si l'element et deja dans le panier

const ModificationQuantiter = function(Panier, IdPanier){
    let quantiter = Panier[IdPanier].quantiter;
    quantiter ++;
    Panier[IdPanier].quantiter = quantiter;
    localStorage.setItem('panier', JSON.stringify(Panier));
}

//fonction creation d'un nouvelle elemnt ci le panier nest pas vide et que l'ement ni et pas

const ajoutObjetPanier = function(Panier, articleID){
    let nouvPanier = {
        name: articleID,
        quantiter: 1,
    }
    Panier.push(nouvPanier)
    localStorage.setItem('panier', JSON.stringify(Panier));
}

//fonction final pour lajout au panier

const AjoutAuPanier = function(){

    if(localStorage.getItem('panier') === null){
        creePanier()
    }else{
        let Panier = JSON.parse(localStorage.getItem('panier'));
        let reponse = recherche(Panier, articleID);

        if(reponse.value === true){
            ModificationQuantiter(Panier,reponse.idPanier);
        }else{
            ajoutObjetPanier(Panier,articleID);
        }
    }
    alert("votre aticle a bien etait au panier");
}

//ajout du bouton qui declanche l'ajout au panier

creeBouton(conteneur, "ajoutPanier", "Ajouter au panier", 'click', AjoutAuPanier);

// ajout du lien, retour a l'index

creeLien(conteneur, "retour", "./index.html", "retour");