import {Navigate} from "react-router";

/*
 * No home page for now, redirect to games view
 */
export function HomePage() {
    return <Navigate to="/games" replace/>
}