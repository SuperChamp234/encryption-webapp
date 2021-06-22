let alphabet = "abcdefghijklmnopqrstuvwxyz";

export function chooseTransformation(conversionObj) { 
    switch(conversionObj.type) {
        case "*/-*ceasar":
            return caesarCipher.setProperties(conversionObj);
        case "Enigma":
            return enigma.setProperties(conversionObj);
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
    rotorVariants = {
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
        for (let rotor in rotorVariants.keys()) { 
            rotorOne.variant = (rotorOne.variant === rotor) ? rotorVariants[rotor] : rotorOne.variant;
            rotorTwo.variant = (rotorTwo.variant === rotor) ? rotorVariants[rotor] : rotorTwo.variant;
            rotorThree.variant = (rotorThree.variant === rotor) ? rotorVariants[rotor] : rotorThree.variant;
        }

        rotorOne.variant = rotorOne.variant.substring(rotorOne.ring) + rotorOne.variant.substring(0, rotorOne.ring); //applies rings
        rotorTwo.variant = rotorTwo.variant.substring(rotorTwo.ring) + rotorOne.variant.substring(0, rotorOne.ring);
        rotorThree.variant = rotorThree.variant.substring(rotorThree.ring) + rotorOne.variant.substring(0, rotorThree.ring);

        this.plugBoard = new Map();
        let plugPairsArray = conversionObj.plugPairs.split(' ');

        //retrieves and sets appropriate number of plug values
        for (let pair of plugPairsArray) { 
            let from = pair[0];
            let to = pair[1];
            this.plugBoard.set(from, to); //makes it so I only have to iterate through keys
            this.plugBoard.set(to, from);
        }

        return encrypt(input, rotorOne, rotorTwo, rotorThree, plugBoard);
    },

    /**
     * Encrypts the input using the Enigma machine encryption algorithm
     * @param  {String} input The input of the user
     * @return {String} result The output of the Enigma encryption
     */
    encrypt: function(input, rotorOne, rotorTwo, rotorThree, plugBoard) {

        let result = "";

        for (let i in input) {
            char = input[i]; //just so I don't edit the original value

            if (alphabet.indexOf(char) === -1) {
                result += char;
                continue;
            }

            convert();
            this.updateRotors();
            result+=char;

            //runs procedure to transform char
            function convert() { 

                plugSwap();
            
                applyRotor(rotorThree);
                applyRotor(rotorTwo);
                applyRotor(rotorOne);
                
                char = alphabet[25-alphabet.indexOf(char)]; //reflector
    
                applyRotor(rotorOne);
                applyRotor(rotorTwo);
                applyRotor(rotorThree);
    
                plugSwap();
            }

            //applies any possible plug swaps onto char
            function plugSwap() { 
                for (let from in plugBoard) {
                    if (from === char.toLowerCase) {
                        char = plugBoard[from];
                    }
                }
            }
            
            //applies rotor shift onto char
            function applyRotor(rotor) { 
                let index = ( (alphabet.indexOf(char) + rotor.pos) % 25)
                char = rotor.variant[index];
            }
        }

        return result;
    },

    //adjusts positions of rotors
    updateRotors: function() { 
        rotorThree.pos = rotorThree.pos++ % 25;
        rotorTwo.pos = (rotorThree.pos % 25) ? rotorTwo.pos : (rotorTwo.pos++ % 25) ; //increments rotorTwo.pos if rotorThree.pos does a full rotation
        rotorOne.pos = (rotorTwo.pos % 25) ? rotorOne.pos : (rotorOne.pos++ % 25) ; //increments rotorTwo.pos if rotorThree.pos does a full rotation
    }
}

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