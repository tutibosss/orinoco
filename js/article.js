//recuperation des donne important pour la conception

let dataMeuble = JSON.parse(localStorage.getItem('dataMeuble'));
let articleID = localStorage.getItem('articleChoisi');
let articleSelet = dataMeuble[articleID]

const conteneur = document.getElementById('detail-article');

//conception de larticle dans le detail

creeArticle(conteneur, articleSelet.name, articleSelet.imageUrl, articleSelet.description, articleSelet.price);

//ajout de la liste d'option

creeListe(conteneur,"listeOption",articleSelet.varnish);

// ajout de retour a l'index et du bouton pour ajoute au panier


creeLien(conteneur, "retour", "./index.html", "retour");

//event sur le bouton pour lajout au panier

const AjoutAuPanier = function(){
    
    //si il n'y a rien dans le bouton

    if(localStorage.getItem('panier') === null){
        creePanier()
    }else{

        //recherche de s'il il et deja dans le panier

        let Panier = JSON.parse(localStorage.getItem('panier'));
        let reponse = recherche(Panier, articleID);

        //action en fonction soit augment la quantite, soit le rajoute

        if(reponse.value === true){
            ModificationQuantiter(Panier,reponse.idPanier);
        }else{
            ajoutObjetPanier(Panier,articleID);
        }
    }
    alert("votre aticle a bien etait au panier");
}

creeBouton(conteneur, "ajoutPanier", "Ajouter au panier", 'click', AjoutAuPanier);