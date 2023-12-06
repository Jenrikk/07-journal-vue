import journalApi from "@/api/journalApi"

export const loadEntries = async ({commit}) => {
    const resp = await journalApi.get('/entries.json')
    const {data} = resp
    const entries = []
    for ( let id of Object.keys(data)){
        entries.push({
            id,
            ...data[id],
        })
    }

    commit('setEntries', entries)

}

export const updateEntry = async ({ commit }, entry) => { //entry
    // extraer solo lo que necesito, todo menos el id
    const { id, date, text, picture } = entry
    const dataToSave = { date, text, picture}

    const { data } = await journalApi.put(`/entries/${id}.json`, dataToSave)

    const entryUpdated = {
        id,
        date: data.date,
        text: data.text
    }

    commit('updateEntry', entryUpdated)
}

export const createEntry = async (/*{commit}*/) => {

}