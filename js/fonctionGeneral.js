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
    let div = conteneur.appendChild(document.createElement('div'));
    div.appendChild(document.createElement("p")).innerText = description;
    div.appendChild(document.createElement("h3")).innerText = prix+"€";
}

const calculeFacture = function(data){
    let total = 0
    for(let i = 0; i<data.length; i++){
        total = total + data[i]
    }
    return total
}

const PanierQuantiter = function(Panier){
    if(Panier != null){
        let total = 0
        for(let i=0; i<Panier.length; i++){
           total = total + Panier[i].quantiter
        }
        return total
    }else{
        return '0'
    }
}