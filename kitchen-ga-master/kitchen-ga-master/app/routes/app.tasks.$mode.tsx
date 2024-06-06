import { Button, Paper, Stack, TextInput } from "@mantine/core";
import { useParams } from "@remix-run/react";




export default function Index() {
    const { mode } = useParams();
    return (
        <Paper bg="transparent">
            <form>
                <Stack>
                    <TextInput label="Task Name" placeholder="" /> 
                    <Button type="submit" variant="filled" color="blue">
                        {mode === "edit" ? "Save" : "Create"}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}