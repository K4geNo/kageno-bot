/**
 * Calculates the difference in milliseconds between the current time and a given time string.
 * @param time - The time string in the format 'HH:mm'.
 * @returns The difference in milliseconds.
 */
export const calculateTime = (time: string) => {
    const now = new Date()
    const [hours, minutes] = time.split(':')
    const hour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        Number(hours),
        Number(minutes),
    )

    if (hour.getTime() < now.getTime()) {
        hour.setDate(hour.getDate() + 1)
    }

    const diff = hour.getTime() - now.getTime()

    return diff
}
