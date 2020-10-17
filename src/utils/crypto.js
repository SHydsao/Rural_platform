/**
 * 加密工具类
 */
import CryptoJS from 'crypto-js'
/**
 * 加密字符串
 * @param {*} word 待加密或者解密的字符串
 * @param {*} keyStr aes加密需要用到的16位字符串的key
 */
export function encrypt(word, keyStr = 'abcdefgabcdefghi') {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}
/**
 * 解密字符串
 * @param {*} word 待加密或者解密的字符串
 * @param {*} keyStr aes加密需要用到的16位字符串的key
 */
export function decrypt(word, keyStr = 'abcdefgabcdefghi') {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}