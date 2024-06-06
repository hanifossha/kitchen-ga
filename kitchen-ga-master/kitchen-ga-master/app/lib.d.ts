declare module 'genetic-js';
// {

//     interface IEntity<T> {
//         entity: T;
//         fitness: number;
//     }

//     interface IGenetic<T> {
//         fitness(entity: T): number;
//         seed(): T;
//         mutate(entity: T): T;
//         crossover(parent1: T, parent2: T): T[];
//         select1(pop: IEntity<T>[]): T;
//         select2(pop: IEntity<T>[]): [T, T];
//         optimize(fitnessA: number, fitnessB: number): boolean;
//         generation?(pop: IEntity<T>[], generation: number, stats: any): boolean;
//         notification?(pop: T[], generation: number, stats: any, isFinished: boolean): void;
//     }

//     class Genetic<T> implements IGenetic<T> {
//         fitness: (entity: T) => number;
//         seed: () => T;
//         mutate: (entity: T) => T;
//         crossover: (parent1: T, parent2: T) => T[];
//         select1: (pop: IEntity<T>[]) => T;
//         select2: (pop: IEntity<T>[]) => [T, T];
//         optimize: (fitnessA: number, fitnessB: number) => boolean;
//         generation?: (pop: IEntity<T>[], generation: number, stats: any) => boolean;
//         notification?: (pop: T[], generation: number, stats: any, isFinished: boolean) => void;
//         start: () => void;
//     }

//     // ... rest of the code (Serialization, Clone, Optimize, Select1, Select2)

//     export function create<T>(): IGenetic<T> {
//         return new Genetic<T>();
//     }

//     export const Select1 = Select1;
//     export const Select2 = Select2;
//     export const Optimize = Optimize;
//     export const Clone = Clone;
// }