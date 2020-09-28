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


const ModificationQuantiter = function(Panier, IdPanier){
    let quantiter = Panier[IdPanier].quantiter;
    quantiter ++;
    Panier[IdPanier].quantiter = quantiter;
    localStorage.setItem('panier', JSON.stringify(Panier));
}

const ajoutObjetPanier = function(Panier, articleID){
    let nouvPanier = {
        name: articleID,
        quantiter: 1,
    }
    Panier.push(nouvPanier)
    localStorage.setItem('panier', JSON.stringify(Panier));
}

const creePanier = function(){
    let Panier = [{
        name: articleID,
        quantiter: 1,
    }]
    localStorage.setItem('panier', JSON.stringify(Panier));
}


const creeBouton = function(conteneur, id, text, action, fonction){
    button = document.createElement('button');
    conteneur.appendChild(button).setAttribute('id', id);
    button.innerText = text;
    document.getElementById(id).addEventListener(action, fonction)
}

const creeLien = function(conteneur, id, page, text){
    let button = document.createElement('a');
    conteneur.appendChild(button).setAttribute('href', page);
    button.setAttribute("id", id)
    button.innerText = text;
}

const creeArticle = function(conteneur, titre, srcImage, description, prix){
    conteneur.appendChild(document.createElement("h2")).innerText = titre;
    conteneur.appendChild(document.createElement("img")).setAttribute("src", srcImage);
    conteneur.appendChild(document.createElement("p")).innerText = description;
    conteneur.appendChild(document.createElement("h3")).innerText = prix;
}

const creeListe = function(conteneur, id, arrayDataListe,){
    conteneur.appendChild(document.createElement('select')).setAttribute('id', id);
    for(i = 0; i < arrayDataListe.length; i++){
    document.getElementById(id).appendChild(document.createElement("option")).innerText = arrayDataListe[i];
    }
}

const creeListeArticleIndex = function(conteneur, dataListe){
    for (let i = 0; i < dataListe.length; i++){

        data = dataListe[i]

        creeLien(conteneur, data._id, "./article.html", "");
        document.getElementById(data._id).className = "article";

        let elmentEnCour = document.getElementById(data._id);
        creeArticle(elmentEnCour, data.name, data.imageUrl, data.description, data.price);

        let idElementSelect
        document.getElementById(data._id).addEventListener('click', function(){
            localStorage.setItem('articleChoisi', idElementSelect = i);
        });
    }
}

const RecupObjetFormulaire = function(form){
    let fd = {};
            new FormData(form);
        
            let data = new FormData(form);
            for (const [key, value] of data.entries()) {
                fd[key] = value
            }
            return fd
}

const TableauidCommande = function(dataPanier, data){
    produitComander = [];
    for(i = 0; i<Panier.length; i++){
        let element = data[dataPanier[i].name]._id
        produitComander.push(element)
    }
    return produitComander
}

const CreeTableauRecapComande = function(conteneur, id, arrayTitreColone,){
    let tableaux = conteneur.appendChild(document.createElement('table'))
    tableaux.setAttribute('id', id);
    let head = document.getElementById(id).appendChild(document.createElement('thead'))
    head.appendChild(document.createElement('tr')).setAttribute('id', 'description');
    for(let i = 0 ; i<arrayTitreColone.length; i++){
        document.getElementById('description').appendChild(document.createElement('th')).innerText = arrayTitreColone[i];
    }
}



const creeLigneContenueTableau = function(conteneur, idLigne, dataAffiche,){
        conteneur.appendChild(document.createElement('tr')).setAttribute('id', idLigne);
        
        for(let i=0; i<dataAffiche.length; i++){
            document.getElementById(idLigne).appendChild(document.createElement('td')).innerText = dataAffiche[i]
        }
}

const calculePrixQuantiter = function(prix, quantiter){
    return prix*quantiter
}

const calculeFacture = function(data){
    let total = 0
    for(let i = 0; i<data.length; i++){
        total = total + data[i]
    }
    return total
}

const deletPanier = function(conteneur, tableaux, text_a_affiche){
    let p = document.createElement('p')
    conteneur.replaceChild(p, tableaux);
    p.innerText = text_a_affiche;
    localStorage.removeItem('panier');
    conteneur.removeChild(document.getElementById('deletPanier'));
}

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