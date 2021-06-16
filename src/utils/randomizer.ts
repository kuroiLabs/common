export class Randomizer {

  // returns random number within range
  public static randomNumber(_min: number, _max: number) {
    return Math.floor(Math.random() * Math.floor(_max + 1)) || _min
  }

}
