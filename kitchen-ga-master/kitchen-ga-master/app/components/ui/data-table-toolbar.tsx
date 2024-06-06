
import { Table } from "@tanstack/react-table";

import { DataTableViewOptions } from "./data-table-view-options";

import { Flex, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: Readonly<DataTableToolbarProps<TData>>) {

  const [debouncedValue, setDebouncedValue] = useDebouncedState(table.getState().globalFilter, 500);

  useEffect(() => {
    table.setGlobalFilter(debouncedValue);
  }, [debouncedValue, table]);

  return (
    <Flex align="center" justify="space-between">
      <Flex flex={1} align="center" gap={4}>
        <TextInput
          leftSection={<MagnifyingGlassIcon width={16} height={16} />}
          placeholder="Search..."
          defaultValue={debouncedValue}
          onChange={(event) => setDebouncedValue(event.target.value)}
          w={170}
        />
      </Flex>
      <DataTableViewOptions table={table} />
    </Flex>
  );
}
