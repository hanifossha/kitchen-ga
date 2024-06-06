import Genetic from "genetic-js";

const numberOfStaffMembers = 5;
const combineSchedules = (schedule1: any, schedule2: any, crossoverDay: number) => {
  let newSchedule = [];
  for (let i = 0; i < 7; i++) {
    newSchedule.push(i < crossoverDay ? schedule1[i] : schedule2[i]);
  }
  return newSchedule;
};
const createRandomShift = () => {
  let shift = [];
  // Assuming you have 5 staff positions, generate a random staff member for each
  for (let role = 0; role < 5; role++) {
    // Randomly assign a staff member to each role
    shift.push(Math.floor(Math.random() * numberOfStaffMembers));
  }
  return shift;
};
const evaluateShift = (shifts: any) => {
  let rolesCovered = new Set(shifts);
  return rolesCovered.size === 5 ? 1 : 0; // Assuming 5 different roles
};

export const genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;
genetic.seed = function () {

  // Create an empty weekly schedule
  let weekSchedule = [];
  for (let day = 0; day < 7; day++) {
    weekSchedule.push({
      dayShift: createRandomShift(),
      nightShift: createRandomShift()
    });
  }
  return weekSchedule;
};
genetic.mutate = function (entity: any) {
  const newEntity = JSON.parse(JSON.stringify(entity));
  // Select a random day and shift
  let day = Math.floor(Math.random() * 7);
  let shiftType = Math.random() > 0.5 ? 'dayShift' : 'nightShift';
  let shift = newEntity[day][shiftType];

  // Swap two roles within the shift
  let role1 = Math.floor(Math.random() * 5);
  let role2 = Math.floor(Math.random() * 5);
  let temp = shift[role1];
  shift[role1] = shift[role2];
  shift[role2] = temp;

  return newEntity;
};
genetic.crossover = function (mother: any, father: any) {

  let day = Math.floor(Math.random() * 7);
  return [
    combineSchedules(mother, father, day),
    combineSchedules(father, mother, day)
  ];
};
genetic.fitness = function (entity: any) {
  let score = 0;
  entity.forEach((day: any) => {
    // Increase the score for each correctly staffed shift
    score += evaluateShift(day.dayShift);
    score += evaluateShift(day.nightShift);
  });
  return score;
};
genetic.generation = function (pop: any, generation: any, stats: any) {
  // Stop when the fitness score reaches 14
  return pop[0].fitness < 14;
};
genetic.notification = (a: any, b: any, c: any, d: any) => {
  console.log(a, b, c, d);
};
