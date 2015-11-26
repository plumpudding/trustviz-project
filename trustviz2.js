var fs = require('fs')
var rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})
rl.on('line', function(str){
  var signed_id
  try {
    signed_id = fs.readFileSync('/tmp/sigid.tmp', 'utf8')
  } catch(e) {}
  obj = JSON.parse(str)
  if(obj.tag_name == "Public-Key" && obj.key_id) {
    signed_id = obj.key_id
  } else if(obj.tag_name == "Signature" && obj.signature_type_name == "Positive certification" && obj.subpackets) {
    for (var j = 0; j < obj.subpackets.length; j++) {
      if(obj.subpackets[j].key_id && obj.subpackets[j].key_id != signed_id) {
        fs.appendFileSync('out/' + signed_id, obj.subpackets[j].key_id + "\n")
      }
    }
  }
  fs.writeFileSync('/tmp/sigid.tmp', signed_id)
})
