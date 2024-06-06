import { Box, Button, Drawer, Paper } from "@mantine/core";
import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "@remix-run/react";
import { ColumnFiltersState, ColumnSizingState, RowSelectionState, SortingState, TableState } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { PageHeader } from "~/components/PageHeader";
import { columns } from "~/components/modules/shifts/columns";
import { DataTable } from "~/components/ui/data-table";
import { ShiftData } from "~/constants/shiftData";


export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    // get search params
    const searchParams = new URLSearchParams(request.url.split("?")[1]);
    const page = searchParams.get("page") ?? undefined;
    const pageSize = searchParams.get("size") ?? 10;

    if (page === undefined && !params) {
        return redirect("/app/shifts?page=1");
    }

    const startIndex = Number(page) * Number(pageSize) - Number(pageSize);
    const endIndex = Number(page) * Number(pageSize);


    // return page data
    if (page && Number(page) >= 1) {

        return json({
            data: {
                data: ShiftData.slice(startIndex, endIndex),
                meta: {
                    pageIndex: Number(page) - 1,
                    pageSize: 10,
                    pageCount: Math.ceil(ShiftData.length / 10),
                },
            },
        });
    }
    return json({
        data: {
            data: [],
            meta: {
                pageIndex: 0,
                pageSize: 1,
                pageCount: 0,
            },
        }
    });
};

export default function Index() {
    const [state, setState] = useState<TableState>({
        pagination: {
            pageIndex: 0,
            pageSize: 10,
        },
        rowSelection: {} as RowSelectionState,
        sorting: [] as SortingState,
        columnFilters: [] as ColumnFiltersState,
        globalFilter: "",
        columnPinning: {},
        columnVisibility: {},
        columnSizing: {} as ColumnSizingState,
    } as TableState);

    const { data } = useLoaderData<typeof loader>();
    const { mode } = useParams();

    const navigate = useNavigate();

    const { pathname } = useLocation();

    useEffect(() => {
        if (state && state.pagination.pageIndex >= 0 && state.pagination.pageIndex <= (data.meta.pageCount ?? 10)) {
            navigate(`/app/shifts?page=${state.pagination.pageIndex + 1}`);
        }
    }, [state]);

    return (
        <Paper bg="transparent">
            <PageHeader title="Shift" subtitle="Kelola Tugas yang terdaftar di sistem">

                <Button
                    onClick={() => {
                        navigate("/app/shifts/create?page=1", { replace: true });
                    }}
                >
                    Tambah Shift
                </Button>
            </PageHeader>
            <Box mt={16}>
                <DataTable data={data} columns={columns} state={state} setState={setState} />
            </Box>
            <Drawer position="right"
                opened={["create", "edit"].includes(mode ?? "")}
                onClose={() => { navigate("/app/shifts?page=1"); }} title={
                    pathname.indexOf('/create') > -1 ? "Tambah Shift" : "Edit Shift"
                }>
                <Outlet />
            </Drawer>
        </Paper>
    );
}