import { redirect, type ActionFunctionArgs } from "@remix-run/node";


export const action = async ({ request }: ActionFunctionArgs) => {
    return redirect("/");
};
