"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ColumnFull } from "@/lib/types";
import { Task } from "@prisma/client";

interface ColumnListProps {
   columns: ColumnFull[];
   tasks: Task[];
  onEditColumn: (column: ColumnFull) => void;
}

export default function ColumnList({columns, onEditColumn}: ColumnListProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
    }
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {columns.map((column) => (
        <Card
          key={column.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onEditColumn(column)}
        >
          <CardContent className="p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-500 text-white">
                {getInitials(column.title)}
              </div>
              <div>
                <h3 className="font-medium text-lg">{column.title}</h3>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Tasks ({column.tasks.length}):</p>
              <div className="flex -space-x-2 overflow-hidden">
                {column.tasks.map((task) => (
                  <Avatar key={task.id} className="border-2 border-background">
                    <AvatarFallback>{getInitials(task.title)}</AvatarFallback>
                  </Avatar>
                ))}
                {column.tasks.length === 0 && <span className="text-sm text-muted-foreground">No tasks</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
