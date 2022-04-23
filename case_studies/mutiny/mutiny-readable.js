function b(parse) {
  return query
    .replace("?", "")
    .split("&") //separates parameters 
    .reduce((prevParam, currParam) => {
      var n = currParam.split("="),
        paramName = n[0],
        paramValue = n[1],
        paramNameArray = paramName.split("."); 
      return (
        paramNameArray.reduce((previousNamePart, currNamePart, currIndex) => {
          return (
            currIndex === paramNameArray.length - 1 //is the last
              ? (previousNamePart[currNamePart] =
                  "string" == typeof paramValue
                    ? unescape(paramValue.replace("+", " "))
                    : paramValue || "")
              : (previousNamePart[currNamePart] = previousNamePart[currNamePart] || {}),
            previousNamePart[currNamePart]
          );
        }, prevParam),
        prevParam
      );
    }, {});
}

module.exports = {parse};
