//creation du contenue de la page artcle
const articleID = localStorage.getItem('articleChoisi');

const conteneur = document.getElementById('detail-article');

const creePage = async function(conteneur, articleID){
    let panier = PanierQuantiter(JSON.parse(localStorage.getItem('panier')))
    document.getElementById('quantiterPanier').innerText = "("+panier+")"

    const dataArticle = await getMeudleId(articleID);

    creeArticle(conteneur, dataArticle.name, dataArticle.imageUrl, dataArticle.description, dataArticle.price);
   
    creeListe(conteneur,"listeOption", dataArticle.varnish);

    creeBouton(conteneur, "ajoutPanier", "Ajouter au panier", 'click', AjoutAuPanier);

    creeLien(conteneur, "retour", "./index.html", "retour");
}

creePage(conteneur, articleID);