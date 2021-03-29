// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function creates modelled organism objects
const pAequorFactory = (num, arr) => {
  return {
    'specimenNum': num,
    'dna': arr,
    //Mutates DNA of instance
    mutate() {
      let baseSelect = Math.floor(Math.random()*15);
      let mutation = returnRandBase();
      while (this.dna[baseSelect] === mutation) {
        mutation = returnRandBase();
      }
      this.dna[baseSelect] = mutation;
      return this.dna;
    },
    //Compares DNA with another instance
    compareDNA(pAequor) {
      let counter = 0
      for(let i=0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
            counter++
          }
        }
        let percentageInCommon = counter/15*100;
        console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${percentageInCommon}% DNA in common`);
      },
      //Tests if instance is likely to survive
      willLikelySurvive() {
      let counter = 0
      for(let i=0; i < this.dna.length; i++) {
        if (this.dna[i] === 'C'| this.dna[i] === 'G') {
            counter++
          }
        }
        if (counter >= 10) {
          return true;
        } else {
          return false;
        }
      },

      //Creates array of complementary DNA strand
      complementStrand() {
        let complementArray = []
        let counter = 0
        for(let i=0; i < this.dna.length; i++) {
          if (this.dna[i] === 'A') {
            complementArray[i] = 'T';
          } else if (this.dna[i] === 'T') {
              complementArray[i] = 'A';
            } else if (this.dna[i] === 'C') {
              complementArray[i] = 'G';
            } else {
              complementArray[i] = 'C';
          }
        }
        return complementArray;
      }
  }
}


//Example of single instance creation
const test = pAequorFactory (1, mockUpStrand());
console.log(test);

//Example of the complementary strand function
console.log("Complementary string: " + test.complementStrand());


//Creates an array of survivable object instances of variable size
const createpAequorArray = (num) => {
let instanceArr = [];
for(let i=0; i<num; i++) {
  let testSurvivable;
  testSurvivable = pAequorFactory(i, mockUpStrand())
  while (testSurvivable.willLikelySurvive() === false) {
    testSurvivable = pAequorFactory(i, mockUpStrand())
  }
  instanceArr[i] = testSurvivable;
}
return instanceArr;
}

//Example array of 30 instances
const arrayOfThirtySpecimens = createpAequorArray(30);
//uncommment line below to log the array
//console.log(arrayOfThirtySpecimens);


//Returns comparison of DNA of any two instances of user named pAequorArray
const compareDNAinArray = (arrayName, specimenA, specimenB) => {
  return arrayName[specimenA].compareDNA(arrayName[specimenB]);
}

//Example DNA comparison within arrayOfThirtyInstances
compareDNAinArray(arrayOfThirtySpecimens, 1, 14);
