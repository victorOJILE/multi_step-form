/**
 * @param {HTMLElement} elem Target element to get its ancestor (or self) element that nodeName matches the one provided
 * @param {String} nodeName NodeName to be used as a predicate for matching elements
 * @param {String} exception Node name(s) to be used as exception(s) so that traversing the ancestors tree can return when necessary
 * @returns {Element}
*/
export default function getParentElem(elem, nodeName, exception) {
 if (elem.nodeName.toLowerCase() == nodeName) return elem;
	if (exception && elem.nodeName.toLowerCase().match(new RegExp(exception))) return; // used match so we can pass in multiple nodeNames as exceptions, when needed e.g "div|ul"
 let child;
	if (elem.parentElement) child = getParentElem(elem.parentElement, nodeName, exception);
	return child;
}