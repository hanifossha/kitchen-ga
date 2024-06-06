import { ActionIcon, Button, Group, InputLabel, NumberInput, Paper, Progress, Stack, Text, Title } from "@mantine/core";
import { PlayIcon, ResetIcon, StopIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { ScheduleTable } from "~/components/ScheduleTable";
import { shiftEntries } from "~/constants/shiftEntries";
import { PopulationManager } from "~/services/engine/PopulationManager";
import { GAEngine } from "~/services/engine/ga"; // Import your GA classes
import { Individual } from "~/services/engine/types";

const gaEngine = new GAEngine(0.5, 0.1); // Example crossover and mutation rates
const initialPopulationSize = 100;
const initialTotalGenerations = 30;
const populationManager = new PopulationManager(
  shiftEntries,
  3,
  gaEngine
);

populationManager.initializePopulation(initialPopulationSize, 6);

const MyGAScheduler = () => {
  const [population, setPopulation] = useState<Individual[]>(populationManager.population);
  const [generation, setGeneration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalGenerations, setTotalGenerations] = useState(initialTotalGenerations);
  const [populationSize, setPopulationSize] = useState(initialPopulationSize);

  const runGA = async () => {
    if (generation >= totalGenerations) {
      console.log("Generation limit reached.");
      setIsRunning(false); // Stop the GA
      return;
    }

    console.log("Running GA...");
    populationManager.evolvePopulation();
    populationManager.evaluatePopulationFitness();
    console.log("Population fitness evaluated.");
    console.log("Population evolved.");
    const sortedPops = [...populationManager.population];
    sortedPops.sort((a, b) => (b.fitness ?? 0) - (a.fitness ?? 0));
    setPopulation(sortedPops);
    console.log("Population set.");
    setGeneration((g) => g + 1);
    console.log("Generation incremented.");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      console.log("GA started...");
      interval = setInterval(runGA, 1000);
    }

    return () => {
      console.log("Clearing interval...");
      clearInterval(interval);
    };
  }, [isRunning, generation]); // Added generation as a dependency to stop the GA after reaching the limit

  const handleReset = () => {
    setIsRunning(false);
    setGeneration(0);
    populationManager.initializePopulation(populationSize, 6);
    setPopulation(populationManager.population);
  };

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);

  return (<>
    <Paper withBorder>
      <Stack p="md">
        <Title order={3}>Penjadwalan Shift Dapur</Title>
        <Group gap={16}>
          <Button leftSection={<PlayIcon />} onClick={handleStart} disabled={isRunning}>
            Mulai
          </Button>
          <ActionIcon onClick={handleStop} size="lg" disabled={!isRunning}>
            <StopIcon />
          </ActionIcon>
          <ActionIcon onClick={handleReset} size="lg" disabled={isRunning}>
            <ResetIcon />
          </ActionIcon>
          <InputLabel>Generasi: </InputLabel>
          <NumberInput value={totalGenerations} onChange={(x) => {
            setTotalGenerations(Number(x));
          }} />
          <InputLabel>Ukuran Populasi: </InputLabel>
          <NumberInput value={populationSize} onChange={(x) => {
            setPopulationSize(Number(x));
          }} />
        </Group>
        <Progress value={(generation / totalGenerations) * 100} />
      </Stack>
    </Paper>


    <Paper mt={8} withBorder>
      <ScheduleTable population={population} />

    </Paper>
    <Text p="xs">Generasi: {generation}</Text>
  </>
  );
};

export default MyGAScheduler;
