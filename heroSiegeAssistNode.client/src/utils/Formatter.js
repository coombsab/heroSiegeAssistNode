
class Formatter {
  capitalizeFirstLetter(string) {
    if (typeof string !== "string") {
      return undefined
    }
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  toTitleCase(string) {
    return string.replace(/\w\S*/g, function(text){
        return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
}
}

export const formatter = new Formatter()