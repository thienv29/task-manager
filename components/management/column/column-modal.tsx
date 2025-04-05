"use client"

import type React from "react"
import {useEffect, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ColumnForm} from "@/lib/types";
import { ColorPicker } from "@/components/ui/color-picker"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";

interface ColumnModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (column: ColumnForm) => void
    onDelete?: (columnId: number) => void
   //  tasks: Task[]
    column: ColumnForm | null
}

const initColumnForm: ColumnForm = {
    id: 0,
    title: "",
    color: "#f1c40f",
}

export default function ColumnModal({isOpen, onClose, onSave, onDelete, column}: ColumnModalProps) {
    const [formData, setFormData] = useState<ColumnForm>(initColumnForm)

    const { data: session } = useSession(); // Lấy thông tin phiên đăng nhập
    useEffect(() => {
        if (column) {
            setFormData({
                id: column.id,
                title: column.title,
                color: column.color,
            })
        } else {
            setFormData(initColumnForm)
        }
    }, [column])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (column) {
            onSave({...formData, id: column.id})
        } else {
            onSave(formData)
        }
    }

    const handleDelete = () => {
        if (column && onDelete) {
            onDelete(column.id)
        }
    }
    console.log("Column Modal", column)
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{column ? "Edit Column" : "Create New Column"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required/>
                        </div>
                        
                        <div className="grid gap-2">
                            <Label htmlFor="color">Color</Label>
                            <ColorPicker value={formData.color} onChange={(color) => handleSelectChange("color", color)} />
                        </div>
                      
                        
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

