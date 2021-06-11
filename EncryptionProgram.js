let conversions = [];
let currId = 0;

class Conversion {

    constructor() {
        this.id = currId;
        this.input = document.getElementById('input').value.toString();
        this.output = document.getElementById('output').value.toString();
        this.conversionType = setConversionType();
        currId++;
    }

    setConversionType = () => document.getElementById('conversionType').value.toString();

}

function onClick(){
    let conversionInstance = { //the details of the current conversion
        
        setConversionType: () => ,
        setOutput: null,
        logInstance: conversions.push()
    };

    switch(conversionInstance.conversionType) {
        case "Enigma":

        case "Caesar Cipher":

        default:

      }
}

let caesarCipher = {
    toEncrypt: document.getElementById('toEncrypt').value.toString(),
    encrypt: () => toEncrypt
}

let enigma = {
}