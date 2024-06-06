
import { ColumnDef } from "@tanstack/react-table";

import { Text } from "@mantine/core";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<{
  id: number;
  title: string;
  status: string;
}>[] = [
  {
    accessorKey: "id",
    minSize: 80,
    size: 80,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Task" />,
    cell: ({ row }) => <Text>{`${row.getValue("id")}`}</Text>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    size: 0.7,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: "status",
    size: 64,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
  },

  {
    id: "actions",
    size: 30,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
