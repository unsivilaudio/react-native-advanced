/**
 * _simple "from then to now" date parser_
 * @param date {Date} - input Date object
 * @return {string} a string subjective date phrase
 */
export function getTimeElapsed(date: Date): string {
    const now = Date.now();
    const dateEpoch = date.getTime();
    const elapsed = now - dateEpoch;

    if (elapsed > 84600 * 1000) {
        // 1 Day = 84600s
        const days = Math.round(Math.floor(elapsed / (84600 * 1000)));
        if (days > 6) {
            const weeks = Math.floor(days / 7);
            if (weeks > 3) {
                const months = Math.floor(weeks / 4);
                if (months > 11) {
                    const years = Math.floor(months / 12);
                    return `${years} years, ${months - years * 12} months ago`;
                }

                return `${months} months ago`;
            }
            return `${weeks} weeks ago`;
        }
        return `${days} days ago`;
    } else if (elapsed > 60 * 1000) {
        // 1m = 60s
        const minutes = Math.round(Math.floor(elapsed / (60 * 1000)));
        if (minutes > 59) {
            const hours = Math.floor(minutes / 60);
            return `${hours} hours ago`;
        }
        return `${minutes} minutes ago`;
    }

    return 'NO-TIME-ELAPSED';
}

/**
 * _simple date converter to format_
 * @param date {Date} - input Date object
 * @return {string} a string represented date
 */
export function parseFormattedDate(date: Date): string {
    const [year, month, day] = date.toISOString().split('T')[0].split('-');

    return `${+month}-${+day}-${year.substring(2)}`;
}
