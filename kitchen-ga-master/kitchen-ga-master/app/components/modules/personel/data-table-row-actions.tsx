
import { Row } from "@tanstack/react-table";

import { ActionIcon } from "@mantine/core";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: Readonly<DataTableRowActionsProps<TData>>) {
  return (
    <ActionIcon.Group>
      <ActionIcon color="blue"  >
        <Pencil1Icon />
      </ActionIcon>
      <ActionIcon color="red" >
        <TrashIcon />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
