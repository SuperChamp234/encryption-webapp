let conversions = [];
let currId = 0;
let alphabet ="abcdefghijklmnopqrstuvwxyz";

class Conversion {

    constructor() {
        this.id = currId;
        this.input = document.getElementById('input').value.toString();
        this.output = document.getElementById('output').value.toString();
        this.conversionType = document.getElementById('conversionType').value.toString();
        currId++;
    }
    
    logConversion() { //records conversion instance
        conversions.push(this);
    }
}

function onClick(){
    let conversion = new Conversion();
    let toEncrypt = document.getElementById('toEncrypt').value.toString(); //whether to encrypt or decrypt  

    switch(conversion.conversionType) {
        case "Caesar Cipher":
            toEncrypt ? caesarCipher.encrypt(conversion.input) : caesarCipher.decrypt(conversion.input);
        case "Enigma":
            encrypt(conversion.input);
        default:
            alert("Invalid Conversion Type");
      }
}

let caesarCipher = {

    setProperties: function() {
        caesarCipher.shiftAmt = document.getElementById('caesarShiftAmt').value;
        this.shiftedAlphabet = alphabet.substring(shiftAmt) + alphabet.substring(0, shiftAmt);
    },

    encrypt: function(input) {
        this.setProperties();
        let result = "";
        for (let char in input) {
            result += shiftedAlphabet.charAt(alphabet.indexOf(char));
        }
    },

    decrypt: function(input) {
        let result = "";
        for (let char in input) {
            result += alphabet.charAt(shiftedAlphabet.indexOf(char));
        }
    }
}

let enigma = {
    rotorVariants = {
        I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
        II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
        III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
        IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
        V: "VZBRGITYUPSDNHLXAWMJQOFECK",
        VI: "JPGVOUMFYQBENHZRDKASXLICTW",
        VII: "NZJHGRCXMYSWBOUFAIVLPEKQDT",
        VIII: "FKQHTLXOCBJSPDZRAMEWNIUYGV"},

    setProperties: function() {
        this.rotorOneVariant = document.getElementById('rotorOneVariant').value.toString;
        this.rotorTwoVariant = document.getElementById('rotorTwoVariant').value.toString;
        this.rotorThreeVariant = document.getElementById('rotorThreeVariant').value.toString;

        for (let rotor in rotorVariants.keys()) {
            this.rotorOneVariant = (this.rotorOneVariant == rotor) ? rotorVariants[rotor] : this.rotorOneVariant;
            this.rotorTwoVariant = (this.rotorTwoVariant == rotor) ? rotorVariants[rotor] : this.rotorTwoVariant;
            this.rotorThreeVariant = (this.rotorThreeVariant == rotor) ? rotorVariants[rotor] : this.rotorThreeVariant;
        }

        this.rotorOnePos = document.getElementById('rotorOnePos').value;
        this.rotorTwoPos = document.getElementById('rotorTwoPos').value;
        this.rotorThreePos = document.getElementById('rotorThreePos').value;

        this.rotorOneRing = document.getElementById('rotorOneRing').value;
        this.rotorTwoRing = document.getElementById('rotorTwoRing').value;
        this.rotorThreeRing = document.getElementById('rotorThreeRing').value;

        this.numPlugs = document.getElementById('numPlugs').value;
        this.plugs = new Map();

        for (let i = 1; i<= numPlugs; i++) { //retrieves appropriate number of plug values
            let from = document.getElementById('plugIn'+i).value.toString();
            let to = document.getElementById('plugOut'+i).value.toString();
            this.plugs.set(from, to);
            this.plugs.set(to, from);
        }
    },

    encrypt: function() {
        
    },

    decrypt: function() {

    },

    updateRotors: function() { 
        this.rotorOnePos = this.rotorOnePos++ % 25;
        this.rotorTwoPos = (this.rotorOnePos % 25) ? this.rotorTwoPos : (this.rotorTwoPos++ % 25) ; //increments rotorTwoPos if rotorOnePos does a full rotation
        this.rotorThreePos = (this.rotorTwoPos % 25) ? this.rotorThreePos : (this.rotorThreePos++ % 25) ; //increments rotorTwoPos if rotorOnePos does a full rotation
    }
}