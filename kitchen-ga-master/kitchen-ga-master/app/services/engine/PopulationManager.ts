import { GAEngine } from "./ga";
import { DailyShift, Individual, Personel } from "./types";


export class PopulationManager {
    population: Individual[];
    gaEngine: GAEngine;
    shiftEntries: Personel[];
    shiftCount: number;

    shiftRequirement: Record<string, boolean> = {
        kokiSayur: true,
        kokiNasi: true,
        kokiLauk: true,
        pemotongSayur: true,
        pembuatBumbu: true,
        pelayan: true
    };

    constructor(shiftEntries: Personel[], shiftCount: number, gaEngine: GAEngine) {
        this.population = [];
        this.gaEngine = gaEngine;
        this.shiftEntries = shiftEntries;
        this.shiftCount = shiftCount;
    }

    initializePopulation(populationSize: number, shiftSize: number): void {
        this.population = Array.from({ length: populationSize }, () =>
        ({
            weeklySchedule: Array.from({ length: 7 }, (_, i) =>
                ({ shifts: this.createRandomDaySchedule(shiftSize) })
            )
        }));
    }

    createRandomDaySchedule(shiftSize: number): DailyShift[] {
        const randomDaySchedule: DailyShift[] = [];
        for (let i = 0; i < this.shiftCount; i++) {
            const personels: any[] = [];
            for (let j = 0; j < shiftSize; j++) {
                const randomPersonel = this.getRandomPersonel();
                personels.push(randomPersonel);
            }
            randomDaySchedule.push({ personels });
        }
        return randomDaySchedule;
    }

    private getRandomPersonel(): Personel {
        const shuffledPersonel = this.shuffleArray(this.shiftEntries);
        const randomIndex = Math.floor(Math.random() * shuffledPersonel.length);
        return shuffledPersonel[randomIndex];
    }


    // Function to shuffle array
    shuffleArray(array: any[]): any[] {
        const shuffledArray = array.slice(); // Create a shallow copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }


    evaluatePopulationFitness(): void {
        const updatedPopulation = this.population.reduce((acc: Individual[], individual: Individual) => {
            const updatedIndividual = { ...individual, fitness: this.evaluateIndividualFitness(individual) };
            acc.push(updatedIndividual);
            return acc;
        }, []);
        console.log(updatedPopulation);
        this.population = updatedPopulation;
    }

    evolvePopulation(): void {
        const parents = this.gaEngine.selectParents(this.population);
        const newPopulation: Individual[] = [];

        const numOffspring = Math.floor((this.population.length - parents.length) * this.gaEngine.crossoverRate);

        for (let i = 0; i < numOffspring; i++) {
            const [parent1, parent2] = this.selectTwoParents(parents);
            const child = this.gaEngine.crossover(parent1, parent2);
            const mutatedChild = this.gaEngine.mutate(child, child.weeklySchedule?.[0].shifts);
            newPopulation.push(mutatedChild);
        }

        while (newPopulation.length < this.population.length) {
            newPopulation.push(parents[Math.floor(Math.random() * parents.length)]);
        }

        this.population = newPopulation;
    }



    private evaluateIndividualFitness(individual: Individual): number {
        let fitness = 0;
        const preferenceWeight = 2.381 * 8; // Scale preference weight
        const penaltyWeight = 2.381 * 15; // Scale penalty weight

        individual.weeklySchedule.forEach((dailySchedule) => {

            dailySchedule.shifts.forEach(shift => {
                const tasksAssigned = new Set<string>(); // Using a set to store unique tasks for each day

                shift.personels.forEach(personel => {
                    if (personel.job.includes(personel.task)) {
                        // Reward if task is within personel's job
                        fitness += preferenceWeight;
                    } else {
                        // Punish if task is outside personel's job
                        fitness -= penaltyWeight;
                    }

                    if (tasksAssigned.has(personel.task)) {
                        // Punish if duplicate task within a shift
                        fitness -= penaltyWeight;
                    } else {
                        tasksAssigned.add(personel.task);
                    }
                });
            });
        });

        return fitness;
    }


    private selectTwoParents(parents: Individual[]): [Individual, Individual] {
        const idx1 = Math.floor(Math.random() * parents.length);
        let idx2;
        do {
            idx2 = Math.floor(Math.random() * parents.length);
        } while (idx1 === idx2 && parents.length > 1); // Ensure there are more than 1 parent to choose from
        if (parents.length === 1) {
            return [parents[0], parents[0]]; // If only one parent exists, return it twice
        }
        return [parents[idx1], parents[idx2]];
    }

}
