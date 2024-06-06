
import { Button, Checkbox, Menu, Stack, Text } from "@mantine/core";
import { SliderIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: Readonly<DataTableViewOptionsProps<TData>>) {
  return (
    <Menu position="bottom-end" offset={7} shadow="md">
      <Menu.Target>
        <Button
          variant="subtle"
          size="sm"
          color="dark"
          leftSection={<SliderIcon width={16} height={16} style={{ marginLeft: 8 }} />}
        >
          View
        </Button>
      </Menu.Target>
      <Menu.Dropdown miw={180}>
        <Menu.Label>Toggle columns</Menu.Label>
        <Menu.Divider />
        <Stack gap={8} mx={8} my={8}>
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
            .map((column) => {
              return (
                <Checkbox
                  key={column.id}
                  checked={column.getIsVisible()}
                  onChange={(e) => column.toggleVisibility(!!e.currentTarget.checked)}
                  label={<Text tt="capitalize">{column.id}</Text>}
                />
              );
            })}
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
