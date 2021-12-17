/**
 * Manage a generic menu.
 * @param pElem
 * @param itemsMenu (links)
 * @constructor
 */
const Menu = function(pElem, itemsMenu) {
    this.parent = pElem;
    this.liens = itemsMenu;

    // fct construct => tous les créations d'éléments HTML se trouvent ici
    this.build = function() {
        this.ul = document.createElement('ul');
        for(let lien of this.liens) {
            const li = document.createElement('li');
            li.appendChild(lien.getLink())
            this.ul.appendChild(li);
        }
        this.parent.appendChild(this.ul);
    }

    this.clickEvent = function(){
        for(let a of this.liens) {
            a.getLink().addEventListener('click', function(event){
                event.preventDefault();
                console.log('lien ' + a.titre + ' a été cliqué !');
            });
        }
    }

}

/**
 * A single link HtmlElement.
 * @param lien
 * @param titre
 * @constructor
 */
const Link = function(lien, titre) {
    this.lien = lien;
    this.titre = titre;
    this.aElement = null;

    // Create a link if null
    this.getLink = function() {
        if(this.aElement === null) {
            this.aElement = document.createElement('a');
            this.aElement.innerHTML = this.titre;
            this.aElement.title = this.titre;
            this.aElement.href = this.lien;
        }
        return this.aElement;
    }
}


// Menu parent element.
const visiteurMenu = document.getElementById('menuVisiteur');
const mesLiensDeMenu = [
    new Link("https://www.google.com", "Home"),
    new Link("https://www.google.com", "Shop"),
    new Link("https://www.google.com", "Payment"),
    new Link("https://www.google.com", "Connect"),
    new Link("https://www.google.com", "Disconnect"),
    new Link("https://www.google.com", "More infos"),
    new Link("#", "Join us"),
];

const topMenu = new Menu(visiteurMenu, mesLiensDeMenu)
topMenu.build();
topMenu.clickEvent();


// Menu Admin element
const adminMenu = document.getElementById("menuAdmin");
const linksMenuAdmin = [
    new Link("youtube", "Home"),
    new Link("youtube", "Users"),
    new Link("youtube", "Statistics"),
    new Link("youtube","Disconnect"),
];

const menuA = new Menu(adminMenu,linksMenuAdmin)
menuA.build();
menuA.clickEvent();