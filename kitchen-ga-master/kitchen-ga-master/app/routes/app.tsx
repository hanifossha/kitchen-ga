import { AppShell, Burger, Group, Image, NavLink, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction } from "@remix-run/node";
import { Form, Link, Outlet, useLocation } from "@remix-run/react";

import classes from '../styles/app.module.scss';


const NavItems = [{
    title: 'Dashboard',
    to: '/app/'
}, {
    title: 'Data',
    children: [{
        title: 'Personil',
        to: '/app/persons'
    }, {
        title: 'Tugas',
        to: '/app/tasks'
    }, {
        title: 'Shift',
        to: '/app/shifts'
    },]
}, {
    title: 'Generator',
    to: '/app/generator'
},
{
    title: 'Laporan',
    to: '/app/report'
}];

export const meta: MetaFunction = () => {
    return [
        { title: 'Subsi Sibindenma Wattar AAU' },
        { name: 'description', content: 'Atur Jadwal Piket Dapur dengan Mudah' },
    ];
};


export const loader = async ({ request }: LoaderFunctionArgs) => {
    return null;
};


export default function Layout() {
    const { pathname } = useLocation();
    const [opened, { toggle }] = useDisclosure();
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
            withBorder={false}
            layout="alt"
        >
            <AppShell.Header bg="blue.7" c="white">
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <Title order={4}>Subsi Sibindenma Wattar AAU</Title>
                </Group>

            </AppShell.Header>
            <AppShell.Navbar p="md" bg="blue.6" c="white">
                <AppShell.Section>
                    <Image src="/logo.png" alt="Dapur GA" w={86} mb="lg" />
                </AppShell.Section>
                <AppShell.Section grow>
                    {NavItems.map((item) => (
                        item.children ? (
                            <NavLink classNames={{
                                root: classes.link,
                            }} key={item.title} label={item.title} opened>
                                {item.children?.map((child) => (
                                    <NavLink classNames={{
                                        root: classes.link,
                                    }} key={child.title} label={child.title} active={pathname.endsWith(child.to)}
                                        component={Link} to={child.to} />
                                ))}
                            </NavLink>
                        ) : (
                            <NavLink classNames={{
                                root: classes.link,
                            }} key={item.title} label={item.title} component={Link} active={pathname.endsWith(item.to)} to={item.to} />
                        )
                    ))}</AppShell.Section>

                <AppShell.Section>
                    <Form method="post" action="/logout">
                        <NavLink label="Logout" component={"button"} type="submit" />
                    </Form>
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main bg="blue.0">
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}