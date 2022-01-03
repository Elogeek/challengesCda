/**
 * Class Theme
 */
export class Theme {
    /**
     * Constructor
     */
    constructor() {
        this.elemet = document.querySelector("#theme");
    }

    /**
     * Change theme of the site
     */
    click(){
        this.elemet.addEventListener("click", evt => {
            evt.preventDefault();

            // here localstorage theme (light, dark) par expl
        })
    }
}