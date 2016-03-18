/* Was in: mep-oup-feature-shim.js
*/

(function ($, W) {
  'use strict';

  $.log = function (s) {
    if (typeof W.console === 'object' && $.oup_debug) {
        W.console.log(arguments.length === 1 ? s : arguments);
    }
  };

})(mejs.$, window);
