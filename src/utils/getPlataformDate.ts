import { addDays } from "date-fns";

export function getPlatformDate(date: Date) {
    return (addDays(date, 1)); //Verificar o pq do componente de calendario retornar data anterior
}