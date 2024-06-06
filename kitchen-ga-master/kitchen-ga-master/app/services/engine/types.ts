

export interface DailyShift {

    personels: Personel[];
}

export interface DailySchedule {
    shifts: DailyShift[];
}

export interface Individual {
    weeklySchedule: DailySchedule[];
    fitness?: number;
}

export interface Personel {
    id: number;
    preferredShifts: number[];
    task: ShiftTask;
    job: ShiftTask[];
}
 

export type ShiftTask = "kokiSayur" |
    "kokiNasi" |
    "kokiLauk" |
    "pemotongSayur" |
    "pembuatBumbu" |
    "pelayan";

export const ShiftTasks: ShiftTask[] = ["kokiSayur", "kokiNasi", "kokiLauk", "pemotongSayur", "pembuatBumbu", "pelayan"];

export const shiftTaskName: Record<ShiftTask, string> = {
    kokiSayur: "Koki Sayur",
    kokiNasi: "Koki Nasi",
    kokiLauk: "Koki Lauk",
    pemotongSayur: "Pemotong Sayur",
    pembuatBumbu: "Pembuat Bumbu",
    pelayan: "Pelayan"
};

export const dayName = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];