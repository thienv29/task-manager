import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import bcrypt from "bcryptjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const roleLabels = {
    ADMIN: {label: "Admin", className: "bg-red-100 text-red-800"},
    MEMBER: {label: "Member", className: "bg-gray-100 text-gray-800"},
    TEAM_LEAD: {label: "Team Lead", className: "bg-blue-100 text-blue-800"},
};