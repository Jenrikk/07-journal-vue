import { computed } from "vue"
import { useStore } from "vuex"

const useAuth = () => {

    const store = useStore()

    const createUser = async (user) => {
        const resp = await store.dispatch('auth/createUser', user)
        return resp
    }

    const signInUser = async (user) => {
        const resp = await store.dispatch('auth/signInUser', user)
        return resp
    }

    const checkAuthStatus = async () => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    const logout = () => {
        store.commit('auth/logout')
        store.commit('journal/clearEntries')
    }


    return {
        //Actions
        createUser,
        signInUser,
        checkAuthStatus,

        //Getters
        authStatus: computed(() => store.getters['auth/currentStatus']),
        username: computed(() => store.getters['auth/currenUsername']),

        //Mutations
        logout

    }

}

export default useAuth