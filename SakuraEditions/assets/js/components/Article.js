/**
 * Class Article
 */
export class Article {
    /**
     * Constructor
     */
    constructor() {
        this.divContainer = document.createElement("div");
        this.right = document.createElement("div");
        this.left = document.createElement("div");
        this.categoryArticle = document.createElement("a");
        this.titleArticle = document.createElement("h2");
        this.contentArticle = document.createElement("p");
        this.authorArticle = document.createElement("p");
        this.publishingDateArticle = document.createElement("p");
        this.imgArticle = document.createElement("i");
        this.srcImgArticle = document.createElement("p");

        this.right.className = "right";
        this.left.className = "left";
    }

    /**
     * Initialization
     */
    init(categoryArticle,titleArticle,contentArticle,authorArticle,publishingDateArticle, imgArticle, srcImgArticle) {

        this.divContainer.className = "visible-article";
        /**
         * If there is no picture for the article
         */
        if(imgArticle === null) {
            imgArticle = "../assets/img/defaultImgArticle.png";
        }

        /**
         * If there is no author for the article
         */
        if(authorArticle === null) {
            authorArticle = "Anonymous"
        }

        /**
         * If there is no category for the article
         */
        if(categoryArticle === null) {
            categoryArticle = "BON PLANS";
        }

        this.categoryArticle.innerHTML = categoryArticle;
        this.titleArticle.innerHTML = titleArticle;
        this.contentArticle.innerHTML = contentArticle;
        this.authorArticle.innerHTML = authorArticle;
        this.publishingDateArticle.innerHTML = (new Date(publishingDateArticle)).toLocaleString();
        this.imgArticle.src = imgArticle;
        this.srcImgArticle.innerHTML = srcImgArticle;

        /**
         * Position in HTML
         */

        let articles = document.createElement("div");
        articles.className = "articles";

        articles.appendChild(this.divContainer);
    }
}