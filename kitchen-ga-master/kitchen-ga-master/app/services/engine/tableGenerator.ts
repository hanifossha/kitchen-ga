import { DailySchedule } from "./types";
import { PersonelNames } from "~/constants/Personel";

const daysOfWeek = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const hourSchedule = ["07:00 - 09:00", "10:00 - 15:00", "16:00 - 22:00"];
    
export function convertToTable(schedule: DailySchedule[] ) {
    const table: string[][] = [];

    // split table into 2 group of weeks, Mon - Wed and Thu - Sun
    const firstWeek = schedule.slice(0, 3);
    const secondWeek = schedule.slice(3);

    // foreach day, transpose the schedule to make this structure
    // | Session | Task | Mon | Tue | Wed | Thu | Fri | Sat | Sun |
    // |---------|------|-----|-----|-----|-----|-----|-----|-----|

    firstWeek.forEach((dailySchedule, dayIndex) => {
        dailySchedule.shifts.forEach((shift, shiftIndex) => {
            shift.personels.forEach((personel, personelIndex) => {
                // create row if not exists
                if (table[shiftIndex] === undefined) {
                    table[shiftIndex] = [];
                }
                // create cell if not exists
                if (table[shiftIndex][dayIndex] === undefined) {
                    table[shiftIndex][dayIndex] = "";
                }
                // fill the cell
                table[shiftIndex][dayIndex] = `${hourSchedule[shiftIndex]} - ${personel.task}`;
            });
        });
    });
    
    // Fill second week

    secondWeek.forEach((dailySchedule, dayIndex) => {
        dailySchedule.shifts.forEach((shift, shiftIndex) => {
            shift.personels.forEach((personel, personelIndex) => {
                // create row if not exists
                if (table[shiftIndex] === undefined) {
                    table[shiftIndex] = [];
                }
                // create cell if not exists
                if (table[shiftIndex][dayIndex + 3] === undefined) {
                    table[shiftIndex][dayIndex + 3] = "";
                }
                // fill the cell
                table[shiftIndex][dayIndex + 3] = `${hourSchedule[shiftIndex]} - ${personel.task}`;
            });
        });
    });

    // Fill empty cells with "-"
    table.forEach(row => {
        for (let i = row.length; i < daysOfWeek.length + 2; i++) {
            row.push("-");
        }
    });

    return table;
}
