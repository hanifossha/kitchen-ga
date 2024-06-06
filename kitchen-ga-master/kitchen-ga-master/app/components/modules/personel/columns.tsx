
import { ColumnDef } from "@tanstack/react-table";

import { Text } from "@mantine/core";
import { Personel } from "~/constants/Personel";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Personel>[] = [
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
    accessorKey: "name",
    size: 0.8,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
  },
  {
    id: "actions",
    size: 200,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
