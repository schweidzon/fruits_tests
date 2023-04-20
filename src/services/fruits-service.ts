import fruitsRepository, { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

function getFruits() {
  return fruitsRepository.getFruits();
}

function getSpecificFruit(id: number) {
  const fruit = fruitsRepository.getSpecificFruit(id);
  //case test 1: fruit doen't exists return status 404
  if (!fruit) {
    throw { message: "Fruit not found." }
  }

  return fruit;
}

function createFruit(fruit: FruitInput): void {
  const fruitAlreadyRegistered = fruitsRepository.getSpecificFruitByName(fruit.name);
  //case test1: fruit already exists in db return status 409
  if (fruitAlreadyRegistered) {
    throw { message: "This fruit already exists!" }
  }

  fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;