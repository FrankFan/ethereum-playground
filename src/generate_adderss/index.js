const crypto = require('crypto');
const createKeccakHash = require('keccak');
const secp256k1 = require('secp256k1/elliptic');

// 地址转换
function toChecksumAddress(address) {
  address = address.toLowerCase().replace('0x', '');
  var hash = createKeccakHash('keccak256').update(address).digest('hex');
  var ret = '0x';
  for (var i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }
  return ret;
}

function generate_address() {
  // 生成私钥
  const privateKey = crypto.randomBytes(32);
  // 生成公钥
  const publicKey = secp256k1.publicKeyCreate(privateKey, false).slice(1);
  // console.log('typeof publicKey ', typeof publicKey, publicKey);

  const strPK = Buffer.from(publicKey);
  // console.log(strPK.toString());

  // 生成地址
  const address = createKeccakHash('keccak256')
    .update(strPK)
    .digest()
    .slice(-20);
  const normalAddress = toChecksumAddress(address.toString('hex'));
  // 查看结果
  console.log('privateKey: ', privateKey.toString('hex'));
  console.log('address: ', normalAddress);
}

generate_address();
