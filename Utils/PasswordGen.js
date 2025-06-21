const PasswordGen = ()=>{
const passString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&';
const passLength = passString.length;

genPass = "";
// console.log(passLength);
// console.log(passString.charAt(0));
// console.log(passString.charAt(passLength-1));

for(let i=0;i<8;i++){
    const randomIndex = Math.floor(Math.random()*passLength);
      genPass+=passString.charAt(randomIndex);
}

return genPass

}

module.exports = PasswordGen;