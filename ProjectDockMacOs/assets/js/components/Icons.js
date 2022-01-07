import {MacDock} from "./MacDock";


const Link = function(link, title,target,tooltip) {
    this.href = link;
    this.alt = title;
    this.target = "_blank";
    this.tooltip = tooltip;
}

new Link("./assets/img/androidS.png","img1","_blank","Android Studio");
new Link("./assets/img/appStore.png", "img2", "_blank", "AppStore");
new Link("./assets/img/blender.png", "img3","_blank", "Blender");
new Link("./assets/img/calculator.png", "img4", "_blank", "Calculator");
new Link("./assets/img/calendar.png", "img5", "_blank", "Calendar");
new Link("./assets/img/discord.png", "img7", "_blank", "Discord");
new Link("./assets/img/firefox.png", "img10", "_blank", "Firefox");
new Link("./assets/img/github.png", "img11", "_blank", "Github");
new Link("./assets/img/gTranslate.png", "img12", "_blank", "Google Translate");
new Link("./assets/img/idea.png", "img13", "_blank", "Intellij Idea");
new Link("./assets/img/deezer.png", "img14", "_blank", "Spotify");
new Link("./assets/img/terminal.png", "img16", "_blank", "Terminal");
new Link("./assets/img/pictures.png", "img17", "_blank", "Photos");
new Link("./assets/img/manga.png", "img18", "_blank", "Manga");



