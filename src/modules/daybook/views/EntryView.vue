<template>
    <template v-if="entryData">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ getDay }}</span>
                <span class="mx-1 fs-3">{{ getMonthName }}</span>
                <span class="mx-2 fs-4 fw-light"> {{ getYear }}, {{ getDayName }}</span>
            </div>
            <div>
                <button class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>

        </div>

        <hr>
        
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="What happened today??" v-model="entryData.text"></textarea>
        </div>

        <img src="https://s2.abcstatics.com/media/viajar/2017/09/09/atacama-desierto-florido-chile-kN7E--620x349@abc.JPG"
            alt="vergel-atacama" class="img-thumbnail">

    </template>

    <!-- @on:click es simplemente una emision de un evento, lo podriamos llamar @on-cualquier-cosa por ejemplo -->
    <Fab icon="fa-save" @on-click="saveEntry" /> 
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import getDayMonthYear from '../helpers/getDayMonthYear'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data() {
        return {
            entryData: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        getDay() {
            const {dayNumber} = getDayMonthYear(this.entryData.date)
            return dayNumber
        },
        getMonthName() {
            const {monthName} = getDayMonthYear(this.entryData.date)
            return monthName
        },
        getYear() {
            const {year} = getDayMonthYear(this.entryData.date)
            return year
        },
        getDayName() {
            const {dayName} = getDayMonthYear(this.entryData.date)
            return dayName
        }
    },
    methods: {
        loadEntry() {
            let entry;
            
            if(this.id === 'new'){
                entry = {
                    text: '',
                    date: new Date().getTime(),
                    picture: ''
                }
            }else{
                entry = this.getEntryById(this.id)
                if (!entry) return this.$router.push({name: 'no-entry'})
            }

            this.entryData = entry
        },
        ...mapActions('journal', ['updateEntry', 'createEntry']),
        async saveEntry() {
            if(this.entryData.id){
                // update
                await this.updateEntry(this.entryData)
            }else{
                //create new entry
               const resp = await this.createEntry(this.entryData)

               this.$router.push({name: 'entry', params: {id: resp}})
            }
            
        }
    },

    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }

  

}
</script>

<style lang="scss" scoped>

textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus{
        outline: none
    }
}
img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right:20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);

}


</style>