import { Stack, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { PersonelNames } from "~/constants/Personel";
import { ShiftData } from "~/constants/shiftData";
import { convertToTable } from "~/services/engine/tableGenerator";
import { Individual, Personel, dayName, shiftTaskName } from "~/services/engine/types";

import "~/styles/print.scss";



export default function Index() {

  const [selectedPopulation, setSelectedPopulation] = useState<Individual | null>(null);

  useEffect(() => {
    document.title = "Jadwal Piket Dapur Subsi Sibindenma Wattar AAU";

    const cachedPops = localStorage.getItem('selectedPopulation');
    if (cachedPops === null) {
      alert("Anda belum memilih jadwal piket dapur. Silahkan pilih jadwal terlebih dahulu.");
    }

    setSelectedPopulation(cachedPops ? JSON.parse(cachedPops) : null);

    if (selectedPopulation && selectedPopulation?.weeklySchedule?.length > 0) {
      window.print();
    }

  }, []);

  return (
    <>


      {
        Array.from({ length: selectedPopulation?.weeklySchedule?.[0]?.shifts?.length ?? 1 }).map((_, i) => (
          <>
            <h3 style={{ textAlign: 'center', paddingTop: 24  }}>
              Jadwal Piket Dapur Subsi Sibindenma Wattar AAU
            </h3>
            <h4 style={{ textAlign: 'center'}}>
              Sesi {i + 1} : {ShiftData[i].startTime} - {ShiftData[i].endTime}
            </h4>

            <Table key={i} withTableBorder withColumnBorders withRowBorders>
              <Table.Thead>
                <Table.Tr>
                  {
                    dayName.map((day, i) => (
                      <Table.Th key={i}>{day}</Table.Th>
                    ))
                  }
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  {
                    selectedPopulation?.weeklySchedule?.map((day, x) => (
                      <Table.Td key={x}>
                        <Stack>
                          {
                            day.shifts?.[i]?.personels?.map((personel: Personel, j) => (
                              <div key={j}>
                                <Text >
                                  {PersonelNames[personel?.id - 1]?.name ?? ' '}
                                </Text>
                                <Text c="gray"  >
                                  {shiftTaskName[personel?.task]}
                                </Text>
                              </div>
                            ))
                          }
                        </Stack>
                      </Table.Td>
                    ))
                  }
                </Table.Tr>
              </Table.Tbody>
            </Table>

            <div style={{ pageBreakAfter: 'always' }} />
          </>
        ))
      }

    </>
  );
}