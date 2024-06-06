
import { ColumnDef } from "@tanstack/react-table";

import { Text } from "@mantine/core";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<{
  id: number;
  startTime: string;
  endTime: string;
}>[] = [
  {
    accessorKey: "id",
    minSize: 80,
    size: 80,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    cell: ({ row }) => <Text>{`Shift ${row.getValue("id")}`}</Text>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "startTime",
    size: 0.7,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Time" />,
  },
  {
    accessorKey: "endTime",
    size: 64,
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Time" />,
  },

  {
    id: "actions",
    size: 30,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
