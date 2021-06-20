let alphabet = "abcdefghijklmnopqrstuvwxyz";

function chooseTransformation(conversionObj) { 
    switch(conversionObj.type) {
        case "Caesar Cipher":
            return caesarCipher.setProperties(conversionObj);
        // case "Enigma":
        //     return encrypt(conversionObj);
        default:
            console.log("Invalid Conversion Type");
            return null;
      }
}

let caesarCipher = {
    setProperties: function(conversionObj) {
        let shiftAmount = conversionObj.settings.shiftAmount;
        let shiftedAlphabet = alphabet.substring(shiftAmount) + alphabet.substring(0, shiftAmount);
        return conversionObj.toEncrypt == true ? caesarCipher.encrypt(conversionObj.input, shiftedAlphabet) : caesarCipher.decrypt(conversionObj.input, shiftedAlphabet);
    },

    /**
     * Encrypts the input by applying a caesar shift
     * @param  {String} input The input of the user
     * @return {String} result The output of the encryption
     */
    encrypt: function(input, shiftedAlphabet) {
        let result = "";
        for (let char of input) {
            console.log(char);
            result += shiftedAlphabet.charAt(alphabet.indexOf(char));
        }
        return result;
    },

    /**
     * Decrypts the input by reversing the caesar shift
     * @param  {String} input The input of the user
     * @return {String} result The output of the decryption
     */
    decrypt: function(input, shiftedAlphabet) {
        let result = "";
        for (let char of input) {
            result += alphabet.charAt(shiftedAlphabet.indexOf(char));
        }
        return result;
    }
}

// let enigma = {

//     //object that stores the possible rotors
//     rotorVariants = { 
//         I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".toLowerCase(), //too lazy to retype them as lowercase lmao
//         II: "AJDKSIRUXBLHWTMCQGZNPYFVOE".toLowerCase(),
//         III: "BDFHJLCPRTXVZNYEIWGAKMUSQO".toLowerCase(),
//         IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB".toLowerCase(),
//         V: "VZBRGITYUPSDNHLXAWMJQOFECK".toLowerCase(),
//         VI: "JPGVOUMFYQBENHZRDKASXLICTW".toLowerCase(),
//         VII: "NZJHGRCXMYSWBOUFAIVLPEKQDT".toLowerCase(),
//         VIII: "FKQHTLXOCBJSPDZRAMEWNIUYGV".toLowerCase()},

//     //Initializing rotor objects (don't think this is necessary but w/e)
//     rotorOne = {},
//     rotorTwo = {},
//     rotorThree = {},

//     //retrieves user selections needed for encryption
//     setProperties: function() { 

//         rotorOne.ring = document.getElementById('rotorOne.ring').value; //gets ring values of rotors
//         rotorTwo.ring = document.getElementById('rotorTwo.ring').value;
//         rotorThree.ring = document.getElementById('rotorThree.ring').value;

//         rotorOne.variant = document.getElementById('rotorOne.variant').value.toString; //gets variants of rotors
//         rotorTwo.variant = document.getElementById('rotorTwo.variant').value.toString; //ordered numerically left -> right
//         rotorThree.variant = document.getElementById('rotorThree.variant').value.toString;

//         //sets alphabet orientation of rotors
//         for (let rotor in rotorVariants.keys()) { 
//             rotorOne.variant = (rotorOne.variant === rotor) ? rotorVariants[rotor] : rotorOne.variant;
//             rotorTwo.variant = (rotorTwo.variant === rotor) ? rotorVariants[rotor] : rotorTwo.variant;
//             rotorThree.variant = (rotorThree.variant === rotor) ? rotorVariants[rotor] : rotorThree.variant;
//         }

//         rotorOne.variant = rotorOne.variant.substring(rotorOne.ring) + rotorOne.variant.substring(0, rotorOne.ring); //applies rings
//         rotorTwo.variant = rotorTwo.variant.substring(rotorTwo.ring) + rotorOne.variant.substring(0, rotorOne.ring);
//         rotorThree.variant = rotorThree.variant.substring(rotorThree.ring) + rotorOne.variant.substring(0, rotorThree.ring);

//         rotorOne.pos = document.getElementById('rotorOne.pos').value; //gets position value of rotors
//         rotorTwo.pos = document.getElementById('rotorTwo.pos').value;
//         rotorThree.pos = document.getElementById('rotorThree.pos').value;

//         this.numPlugs = document.getElementById('numPlugs').value;
//         this.plugBoard = new Map();

//         //retrieves and sets appropriate number of plug values
//         for (let i = 1; i<= numPlugs; i++) { 
//             let from = document.getElementById('plugIn'+i).value.toString();
//             let to = document.getElementById('plugOut'+i).value.toString();
//             this.plugBoard.set(from, to);
//             this.plugBoard.set(to, from);
//         }
//     },

//     /**
//      * Encrypts the input using the Enigma machine encryption algorithm
//      * @param  {String} input The input of the user
//      * @return {String} cipher The output of the Enigma encryption
//      */
//     encrypt: function(input) {
//         this.setProperties();
//         let cipher = "";

//         for (let i = 0; i<input.length; i++) {

//             let char = input[i];
//             convert();
//             this.updateRotors();
//             cipher+=char;

//             //runs procedure to transform char
//             function convert() { 

//                 plugSwap();
            
//                 applyRotor(rotorThree);
//                 applyRotor(rotorTwo);
//                 applyRotor(rotorOne);
                
//                 char = alphabet[25-alphabet.indexOf(char)]; //reflector
    
//                 applyRotor(rotorOne);
//                 applyRotor(rotorTwo);
//                 applyRotor(rotorThree);
    
//                 plugSwap();
//             }

//             //applies any possible plug swaps onto char
//             function plugSwap() { 
//                 for (let from in this.plugBoard) {
//                     if (from === char.toLowerCase) {
//                         char = this.plugBoard[from];
//                     }
//                 }
//             }
            
//             //applies rotor shift onto char
//             function applyRotor(rotor) { 
//                 let index = ( (alphabet.indexOf(char) + applyRotor.pos) % 25)
//                 char = rotor.variant[index];
//             }
//         }

//         return cipher;
//     },

//     //adjusts positions of rotors
//     updateRotors: function() { 
//         rotorThree.pos = rotorThree.pos++ % 25;
//         rotorTwo.pos = (rotorThree.pos % 25) ? rotorTwo.pos : (rotorTwo.pos++ % 25) ; //increments rotorTwo.pos if rotorThree.pos does a full rotation
//         rotorOne.pos = (rotorTwo.pos % 25) ? rotorOne.pos : (rotorOne.pos++ % 25) ; //increments rotorTwo.pos if rotorThree.pos does a full rotation
//     }
// }

/**
let testObject = {
    input: "hi",
    settings: {
        shiftAmount: 2
    },
    type: "Caesar Cipher",
    toEncrypt: false
}

let testOutput = chooseTransformation(testObject);
console.log(`testOutput = ${testOutput}`);
*/