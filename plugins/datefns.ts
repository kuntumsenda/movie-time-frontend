import { format, parseISO, differenceInDays } from "date-fns";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dateFns: {
        format,
        parseISO,
        differenceInDays,
      },
    },
  };
});
