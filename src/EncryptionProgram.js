// @ts-check
let alphabet = "abcdefghijklmnopqrstuvwxyz";

function chooseTransformation(conversionObj) { 
    switch(conversionObj.type) {
        case "*/-*ceasar":
            return caesarCipher.setProperties(conversionObj);
        case "Enigma":
            return enigma.setProperties(conversionObj);
        default:
            //console.log("Invalid Conversion Type");
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
        for (let char of input.toLowerCase()) {
            if (alphabet.indexOf(char) != -1) {
                result += shiftedAlphabet.charAt(alphabet.indexOf(char));
            } else {
                result += char;
            }
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
        for (let char of input.toLowerCase()) {
            if (alphabet.indexOf(char) != -1) {
                result += alphabet.charAt(shiftedAlphabet.indexOf(char));
            } else {
                result += char;
            }
        }
        return result;
    }
}

let enigma = {

    //object that stores the available rotors

    reflectorVariants: {
        b: "YRUHQSLDPXNGOKMIEBFZCWVJAT".toLowerCase()
    },
    rotorVariants: {
        i: "EKMFLGDQVZNTOWYHXUSPAIBRCJ".toLowerCase(), //too lazy to retype them as lowercase lmao
        ii: "AJDKSIRUXBLHWTMCQGZNPYFVOE".toLowerCase(),
        iii: "BDFHJLCPRTXVZNYEIWGAKMUSQO".toLowerCase(),
        iv: "ESOVPZJAYQUIRHXLNFTGKDCMWB".toLowerCase(),
        v: "VZBRGITYUPSDNHLXAWMJQOFECK".toLowerCase(),
        vi: "JPGVOUMFYQBENHZRDKASXLICTW".toLowerCase(),
        vii: "NZJHGRCXMYSWBOUFAIVLPEKQDT".toLowerCase(),
        viii: "FKQHTLXOCBJSPDZRAMEWNIUYGV".toLowerCase()
    },

    //retrieves user selections needed for encryption
    setProperties: function(conversionObj) { 

        let rotorOne = conversionObj.settings.rotorOne; //too lazy to rewrite the prefixes
        let rotorTwo = conversionObj.settings.rotorTwo;
        let rotorThree = conversionObj.settings.rotorThree;

        //sets alphabet orientation of rotors
        for (let rotor in enigma.rotorVariants) { 
            rotorOne.variant = (rotorOne.variant === rotor) ? enigma.rotorVariants[rotor] : rotorOne.variant;
            rotorTwo.variant = (rotorTwo.variant === rotor) ? enigma.rotorVariants[rotor] : rotorTwo.variant;
            rotorThree.variant = (rotorThree.variant === rotor) ? enigma.rotorVariants[rotor] : rotorThree.variant;
        }
        rotorThree.variant = rotorThree.variant.substring(rotorThree.ring) + rotorThree.variant.substring(0, rotorThree.ring);
        rotorTwo.variant = rotorTwo.variant.substring(rotorTwo.ring) + rotorTwo.variant.substring(0, rotorTwo.ring);
        rotorOne.variant = rotorOne.variant.substring(rotorOne.ring) + rotorOne.variant.substring(0, rotorOne.ring);

        let plugBoard = new Map();
        let plugPairsArray = conversionObj.settings.plugPairs.split(' ');

        //retrieves and sets appropriate number of plug values
        for (let pair of plugPairsArray) { 
            let from = pair[0];
            let to = pair[1];
            plugBoard.set(from, to); //makes it so I only have to iterate through keys
            plugBoard.set(to, from);
        }
        return enigma.encrypt(conversionObj.input, rotorOne, rotorTwo, rotorThree, plugBoard);
    },

    /**
     * Encrypts the input using the Enigma machine encryption algorithm
     * @param  {String} input The input of the user
     * @return {String} result The output of the Enigma encryption
     */
    encrypt: function(input, rotorOne, rotorTwo, rotorThree, plugBoard) {

        let result = "";

        for (let i of input) {
            //console.log(input);
            let char = i; //just so I don't edit the original value

            if (alphabet.indexOf(char) === -1) {
                result += char;
                continue;
            }

            convert();
            result+=char;

            //runs procedure to transform char
            function convert() { 

                plugBoard.forEach(plugSwap); 

                enigma.updateRotors(rotorOne, rotorTwo, rotorThree);
                
                applyRotor(rotorThree);
                //console.log(char);
                applyRotor(rotorTwo);
                //console.log(char);
                applyRotor(rotorOne);
                //console.log(char);
                applyReflector();
                //console.log("reflector: " + char);
                applyRotor(rotorOne, true);
                //console.log(char);
                applyRotor(rotorTwo, true);
                //console.log(char);
                applyRotor(rotorThree, true);
                //console.log(char);
                plugBoard.forEach(plugSwap); 
                
            }

            //applies any possible plug swaps onto char
            function plugSwap(value, key, map) { 
                char = key === char ? value : char;
            }

            //applies rotor shift onto char
            function applyRotor(rotor, isInverse) { 
                //encryptions after rotor
                if (isInverse) {
                    let index = (rotor.variant.indexOf(char) - rotor.pos) % 26;
                    if (index<0) {
                        index = 26+index;
                    }
                    //console.log("inverse " + index);
                    char = alphabet.charAt(index);
                } else {
                    let index = (alphabet.indexOf(char) + rotor.pos) % 26;
                    //console.log(index);
                    char = rotor.variant.charAt(index);
                }
            }

            //applies reflector
            function applyReflector() {
                let index = alphabet.indexOf(char);
                char = enigma.reflectorVariants.b.charAt(index);
            }
        }

        return result;
    },

    //adjusts positions of rotors and the strings
    updateRotors: function(rotorOne, rotorTwo, rotorThree) { 
        rotorThree.pos = (rotorThree.pos + 1) % 26;
        rotorThree.variant = rotorThree.variant.substring(1) + rotorThree.variant.substring(0, 1);
        rotorTwo.pos = (rotorThree.pos === 0) ? ((rotorTwo.pos + 1) % 26): rotorTwo.pos; //increments rotorTwo.pos if rotorThree.pos does a full rotation
        rotorTwo.variant = rotorTwo.variant.substring(1) + rotorTwo.variant.substring(0, 1);
        rotorOne.pos = (rotorTwo.pos + rotorThree.pos === 0) ? ((rotorOne.pos + 1) % 26): rotorOne.pos; //increments rotorOne.pos if rotorTwo.pos does a full rotation
        rotorOne.variant = rotorOne.variant.substring(1) + rotorOne.variant.substring(0, 1); //applies rings
    }
}
// Testing
// let testObject = {
//     input: "pqkk ygfn fktq",
//     settings: {
//         rotorOne: {
//             rotor: "one",
//             pos: 5,
//             ring: 3,
//             variant: 'i'
//         },

//         rotorTwo: {
//             rotor: "two",
//             pos: 2,
//             ring: 2,
//             variant: 'ii'
//         },

//         rotorThree: {
//             rotor: "three",
//             pos: 8,
//             ring: 5,
//             variant: 'iii'
//         },

//         plugPairs: ""
//     },
//     type: "Enigma",
//     toEncrypt: true
// }

// let testOutput = chooseTransformation(testObject);
// console.log(`testOutput = ${testOutput}`);