
export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false

}

export const updateEntry = (state, entryUpdated) => {
    const index = state.entries.findIndex(entry => entry.id === entryUpdated.id)

    state.entries[index] = entryUpdated
}

export const addEntry = (state, newEntry) => {
    state.entries.unshift(newEntry)
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)
}

export const clearEntries = (state) => {
    state.entries = []
}