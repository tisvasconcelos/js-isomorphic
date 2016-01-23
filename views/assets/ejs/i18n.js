define(["ejs", "i18n"],function(EJS, i18n){
  EJS.Helpers.prototype.__ = function(key) {
    if (arguments.length == 1) {
      return i18n.get(key);
    } else {
      return i18n.args.apply(this, arguments);
    }
  };

  EJS.Helpers.prototype.__n = function(key, count) {
    return i18n.count(key, count);
  };
});
