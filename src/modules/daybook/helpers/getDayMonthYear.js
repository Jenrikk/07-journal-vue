

const getDayMonthYear = (dateString) => {
    const date = new Date(dateString)

    const dayNumber = date.getDate()

    const month= new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date)
    const monthName = month[0].toUpperCase() + month.substring(1)

    const year = date.getFullYear()

    const day = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date)
    const dayName = day[0].toUpperCase() + day.substring(1)

    return {
        dayNumber,
        monthName,
        year,
        dayName
    }

}

export default getDayMonthYear