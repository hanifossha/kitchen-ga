import { Row } from "@tanstack/react-table";

import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { DotsHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@remix-run/react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: Readonly<DataTableRowActionsProps<TData>>) {
  const navigate = useNavigate();
  return (
    <Menu position="bottom-end" shadow="md" key={row.index}>
      <Menu.Target>
        <Tooltip label="Actions">
          <ActionIcon variant="transparent">
            <DotsHorizontalIcon width={20} height={20} />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown w={200}>
        <Menu.Item leftSection={<Pencil1Icon />}
          onClick={() => {
            navigate(`/app/shifts/edit?page=1`);
          }}
        >Edit</Menu.Item>
        <Menu.Divider />
        <Menu.Item leftSection={<TrashIcon />}>Delete</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
