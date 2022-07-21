/**
 *  Transform the element into a resize handler
 * @param element
 * @param callback called on resize with the offsetX parameter
 */
function menuResize(element, callback) {
    element.addEventListener('pointerdown')
}

menuResize(document.querySelector('.resize'), function (x) {
    console.log(x)
})