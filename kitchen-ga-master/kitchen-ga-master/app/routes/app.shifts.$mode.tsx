import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useParams } from "@remix-run/react";




export default function Index() {
    const { mode } = useParams();
    return (
        <Paper bg="transparent">
            <form>
                <Stack>
                    <TextInput label="Start Time" placeholder="06:00" />
                    <TextInput label="End Time" placeholder="10:00" />
                    <Button type="submit" variant="filled" color="blue">
                        {mode === "edit" ? "Save" : "Create"}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}