const sidebar_width = "sidebarWidth"

/**
 *  Transform the element into a resize handler
 * @param element
 * @param cb called on resize with the offsetX parameter
 */
function menuResize(element, cb) {
    // When you click on the element
    element.addEventListener('pointerdown',onPointerDown);

    /**
     * start listening to cursor movement
     * @param {PointerEvent} e
     */
    function onPointerDown(e) {
        e.preventDefault();
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUp, { once: true });
    }

    /**
     * When moving the cursor, updates the width of the sidebar
     * @param {PointerEvent} e
     */
    function onPointerMove(e) {
        e.preventDefault();
        cb(e.pageX);
    }

    /**
     * When the cursor is released, I stop following the movement of the cursor
     * @param {PointerEvent} e
     */
    function onPointerUp(e) {
        document.removeEventListener('pointermove', onPointerMove);
    }

}

menuResize(document.querySelector('.resize'), function (x) {
    const sidebarWidthResult = x + "px";
    sessionStorage.setItem(sidebar_width, sidebarWidthResult)
    document.body.style.setProperty("--sidebar", sidebarWidthResult);
    //console.log(sidebarWidthResult);
})

const sidebarWidthResult = sessionStorage.getItem(sidebar_width);
if (sidebarWidthResult !== null) {
    document.body.style.setProperty("--sidebar", sidebarWidthResult);
}
