import { Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PersonelNames } from "~/constants/Personel";
import { shiftTaskName } from "~/services/engine/types";


export const loader = async ({ request }: LoaderFunctionArgs) => {
    return json({
        stats: [
            { title: "Total Personel", value: PersonelNames.length },
            { title: "Total Tugas", value: Object.keys(shiftTaskName).length },
            { title: "Jumlah Sesi", value: 3 }
        ]
    });
};



export default function Index() {
    const { stats } = useLoaderData<typeof loader>();
    return (<>
        <Title order={1}>Selamat Datang</Title>
        <p>
            Tambahkan anggota staf dapur baru atau lihat jadwal saat ini.
        </p>
        <SimpleGrid cols={{ md: 3 }}>
            {/* Stats, Person and Tasks */}
            {
                stats.map((stat: any) => (
                    <Paper withBorder p="md" key={stat.title}>
                        <Title order={1}>{stat.value}</Title>
                        <Text c="gray">{stat.title}</Text>
                    </Paper>
                ))
            }

        </SimpleGrid>
    </>
    );
}