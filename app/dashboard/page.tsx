import React from "react";
import TaskBoard from "@/components/management/task/task-board";

export default function Home() {
    return (
        <main>
            <h1 className="text-3xl font-bold mb-6">Team Task Management</h1>
            <TaskBoard/>
        </main>
    )
}
