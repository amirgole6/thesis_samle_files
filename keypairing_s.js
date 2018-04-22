// Generate a key pair and  SHA-256 hash
var curve = sjcl.ecc.curves.k256;
var keys = sjcl.ecc.ecdsa.generateKeys(curve,6); // 6 is actually the default paranoia, so you can omit that
var signature = keys.sec.sign(hash);

// Extract public point and create a public key object for testing
var pubkey_x = new curve.field(sjcl.bn.fromBits(keys.pub.get().x));
var pubkey_y = new curve.field(sjcl.bn.fromBits(keys.pub.get().y));
var point = new sjcl.ecc.point(curve, pubkey_x, pubkey_y);
var newpubkey = new sjcl.ecc.ecdsa.publicKey(curve, point);

// see the signature and verify it
console.log("sign: "+sjcl.codec.base64.fromBits(signature));
console.log("verified: "+newpubkey.verify(hash, signature));

//-----------------------

var pubkey_hex = sjcl.codec.hex.fromBits(keys.pub.get().x) + sjcl.codec.hex.fromBits(keys.pub.get().y);
var seckey_hex = sjcl.codec.hex.fromBits(keys.sec.get());

// Unserialize and create a public key object with sjcl
var public_key = new sjcl.ecc.ecdsa.publicKey(curve, sjcl.codec.hex.toBits(pubkey_hex));

// Unserialize and create a private key object
var secret_key_bn = new sjcl.bn(seckey_hex);
var secret_key = new sjcl.ecc.ecdsa.secretKey(curve, secret_key_bn);

