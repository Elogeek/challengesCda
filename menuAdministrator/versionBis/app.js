const sidebar_width = "sidebarWidth"

/**
 *  Transform the element into a resize handler
 * @param element
 * @param cb called on resize with the offsetX parameter
 */
function menuResize(element, cb) {
    // Lorsque l'on clique sur l'élément
    element.addEventListener('pointerdown',onPointerDown);

    /**
     * On commence à écouter le déplacement du curseur
     * @param {PointerEvent} e
     */
    function onPointerDown(e) {
        e.preventDefault();
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    /**
     * Au déplacement du curseur, on met à jour la largeur de la sidebar
     * @param {PointerEvent} e
     */
    function onPointerMove(e) {
        e.preventDefault();
        cb(e.pageX);
    }

    /**
     * Lorsque le curseur est relaché, on arrête de suivre le déplacement du curseur
     * @param {PointerEvent} e
     */
    function onPointerUp(e) {
        document.removeEventListener('pointermove', onPointerMove);
    }

}

menuResize(document.querySelector('.resize'), rafThrottle (function (x) {
    //console.log(x);
    const sidebarWidthResult = x + "px";
    sessionStorage.setItem(sidebar_width, sidebarWidthResult)
    document.body.style.setProperty("--sidebar", sidebarWidthResult);
}))

const sidebarWidthResult = sessionStorage.getItem(sidebar_width);
if (sidebarWidthResult !== null) {
    document.body.style.setProperty("--sidebar", sidebarWidthResult);
}

function rafThrottle (callback) {
    let requestId = null

    let lastArgs

    const later = (context) => () => {
        requestId = null
        callback.apply(context, lastArgs)
    }

    const throttled = function(...args) {
        lastArgs = args;
        if (requestId === null) {
            requestId = requestAnimationFrame(later(this))
        }
    }

    throttled.cancel = () => {
        cancelAnimationFrame(requestId)
        requestId = null
    }

    return throttled
}