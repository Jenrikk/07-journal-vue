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


    return {
        //Actions
        createUser,
        signInUser

    }

}

export default useAuth