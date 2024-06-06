import { ActionIcon, Button } from "@mantine/core";
import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>;
  }

  return (
    <div className={className}>
      <Button
        variant="transparent"
        size="sm"
        radius="sm"
        color="dark"
        styles={{ inner: { justifyContent: "space-between", width: "100%" } }}
        rightSection={
          <ActionIcon variant="subtle" size="sm" radius="sm" color="dark"
            onClick={() => {
              if (column.getIsSorted() === "desc") {
                return column.toggleSorting(undefined);
              }

              if (column.getIsSorted() === "asc") {
                return column.toggleSorting(true);
              }

              return column.toggleSorting(false);
            }}
          >
            {column.getIsSorted() === "desc" && (
              <ArrowDownIcon width={16} height={16} />
            )}
            {column.getIsSorted() === "asc" && (
              <ArrowUpIcon width={16} height={16} />
            )}
            {column.getIsSorted() === false && (
              <CaretSortIcon width={16} height={16} />
            )}
          </ActionIcon>

        }
      >
        {title}
      </Button>
     
    </div>
  );
}
