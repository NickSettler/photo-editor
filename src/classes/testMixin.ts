class Animal {
  public type: string;

  constructor(type: string) {
    this.type = type;
  }
}

class Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

interface AnimalPeople extends Animal, Person {}

class AnimalPeople {}

export default AnimalPeople;
