import { Alert, Button, Container, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { PageHeader } from "~/components/PageHeader";
import { Individual } from "~/services/engine/types";

export default function Index() {
    const [selectedPopulation, setSelectedPopulation] = useState<Individual | null>(null);
    useEffect(() => {
        // get from localStorage
        const data = localStorage.getItem('selectedPopulation');
        if (data) {
            setSelectedPopulation(JSON.parse(data));
        }
    }, []);


    return (
        <>
            <PageHeader title="Laporan" />

            {
                selectedPopulation === null && (
                    <Alert color="yellow" my="md" title="Belum ada jadwal terpilih">
                        Anda perlu melakukan generate dan memilih jadwal terlebih dahulu.
                    </Alert>)
            }

            <Button mt="md" disabled={selectedPopulation === null}
                onClick={() => {
                    // create a new window popup to print
                    const win = window.open('/print', '_blank');
                    if (win) {
                        win.focus();
                    }

                }}

            >
                Cetak Laporan
            </Button>
        </>
    );
}