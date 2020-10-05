//fonction pour la cration de la liste d'article
const creeListeArticleIndex = function(conteneur, dataListe){
    for (let i = 0; i < dataListe.length; i++){

        data = dataListe[i]

        creeLien(conteneur, data._id, "./article.html", "");
        document.getElementById(data._id).className = "article";

        let elmentEnCour = document.getElementById(data._id);
        creeArticle(elmentEnCour, data.name, data.imageUrl, data.description, data.price);

        let idSelect
        document.getElementById(data._id).addEventListener('click', function(){
            localStorage.setItem('articleChoisi', idSelect = dataListe[i]._id);
        });
    }
}

//fonction de la creation de la page

const creePageIndex = async function(){
    let dataMeuble = await getMeuble()

    let conteneur = document.getElementById("conteneur-article");
    creeListeArticleIndex(conteneur, dataMeuble);
}

let panier = PanierQuantiter(JSON.parse(localStorage.getItem('panier')))
document.getElementById('quantiterPanier').innerText = "("+panier+")"

creePageIndex()