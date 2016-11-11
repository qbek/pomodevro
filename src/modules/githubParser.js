
function parse (json) {
  return json.filter(function (value) {
    if (value.type == "PushEvent") {
      return true;
    }
    return false;
  })
}

module.exports.parse = parse;