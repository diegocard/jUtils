// ================================== STRINGS =================================

/**
 * Format a string in a similar way to Java or C#.
 * @method format
 * @memberOf JSUtils.Strings
 * @param  {string} str Pre-format string.
 * @return {string}     Formatted string.
 */
JSUtils.format = function (str) {
  var args = Array.prototype.slice.call(arguments, 1),
      sprintfRegex = /\{(\d+)\}/g;

  return str.replace(sprintfRegex, function(match, number) {
    return number in args ? args[number] : match;
  });
};

JSUtils.microTemplate = function(str, obj) {
  // TODO: Implement, test
  for(var prop in obj) {
    str=str.replace(new RegExp('{{'+prop+'}}','g'), obj[prop]);
  }
  return str;
};

JSUtils.hashCode = function(str){
  //TODO: Doc, test
  var hash = 0,
      i, len, c;
  if (str.length === 0) return hash;
  for (i=0, len=str.length; i<len; i++) {
      c     = str.charCodeAt(i);
      hash  = ((hash<<5)-hash)+c;
      hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/**
 * Stored and returns text translations.
 * @requires JUtils.hashCode
 * @param  {String} str         Text to be translated.
 * @param  {String} lang        The language.
 * @param  {String} translation If specified, stores the translation.
 * @return {String}             Translated text.
 */
JSUtils.translate = function(str, lang, translation) {
  var translations = JSUtils.getVariable('translations'),
      strHash;
  if (!translations) translations = JSUtils.storeVariable('translations', {});
  if (JSUtils.isString(str) && JSUtils.isString(lang)) {
    strHash = JSUtils.hashCode(str + lang);
    if (JSUtils.isString(translation)) {
      // Store the translation
      translations[strHash] = translation;
      return translation;
    } else {
      // Return the translation
      return translations[strHash];
    }
  } else {
    throw new TypeError('You must provide at least a string and language');
  }
};
