"use client"

import type React from "react"
import {useState} from "react"
import {AlertCircle} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ConfirmDialogProps {
    title: string
    description: string
    trigger: React.ReactNode
    confirmLabel?: string
    cancelLabel?: string
    variant?: "default" | "destructive"
    onConfirm: () => void
}

export function ConfirmDialog({
                                  title,
                                  description,
                                  trigger,
                                  confirmLabel = "Confirm",
                                  cancelLabel = "Cancel",
                                  variant = "default",
                                  onConfirm,
                              }: ConfirmDialogProps) {
    const [open, setOpen] = useState(false)

    const handleConfirm = () => {
        onConfirm()
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {variant === "destructive" && <AlertCircle className="h-5 w-5 text-destructive"/>}
                        {title}
                    </DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        {cancelLabel}
                    </Button>
                    <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={handleConfirm}>
                        {confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

