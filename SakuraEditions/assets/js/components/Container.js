import {Theme} from "./Theme";
import {Articles} from "./Articles";

export class Container {

    /**
     * Constructor
     */
    constructor() {
        this.div = document.createElement("div");
        this.article = new Articles();
        this.mode = new Theme();
    }

    /**
     * Initialization
     */
    init() {
        document.body.appendChild(this.div);
        this.article.init(this.div);
        this.mode.init(this.div);
        this.mode.click();
    }
}