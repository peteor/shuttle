/**
 *  When called this will listen for the tab gaining focus again. It will then run the callback function
 *  passed to it. 
 */

var handleReFocus = function(callback) {

  function getHiddenProp() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    // if 'hidden' is natively supported just return it
    if ('hidden' in document) return 'hidden';
    // otherwise loop over all the known prefixes until we find one
    for (var i = 0; i < prefixes.length; i++) {
      if ((prefixes[i] + 'Hidden') in document)
        return prefixes[i] + 'Hidden';
    }
    // otherwise it's not supported
    return null;
  }

  // use the property name to generate the prefixed event name
  var visProp = getHiddenProp();
  if (visProp) {
    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
    document.addEventListener(evtname, visChange);
  }

  function isHidden() {
    var prop = getHiddenProp();
    if (!prop) {
      return false;
    }
    return document[prop];
  }

  /* Fire callback on refocus */
  function visChange() {
    if (!isHidden()) {
      console.log("Tab gains focus");
      callback();
    }
  }
}