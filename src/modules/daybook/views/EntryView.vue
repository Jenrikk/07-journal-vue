<template>
    <template v-if="entryData">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ getDay }}</span>
                <span class="mx-1 fs-3">{{ getMonthName }}</span>
                <span class="mx-2 fs-4 fw-light"> {{ getYear }}, {{ getDayName }}</span>
            </div>
            <div>

                <input type="file" @change="onSelectedImage" ref="imageSelector" v-show="false" accept="image/png, image/jpeg">

                <button 
                    v-if="entryData.id"
                    class="btn btn-danger mx-2"
                    @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary"
                    @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>

        </div>

        <hr>
        
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="What happened today??" v-model="entryData.text"></textarea>
        </div>

        <!-- <img src="https://s2.abcstatics.com/media/viajar/2017/09/09/atacama-desierto-florido-chile-kN7E--620x349@abc.JPG"
            alt="vergel-atacama" class="img-thumbnail"> -->

        <img v-if="localImage" :src="localImage"
            alt="vergel-atacama" class="img-thumbnail">

    </template>

    <!-- @on:click es simplemente una emision de un evento, lo podriamos llamar @on-cualquier-cosa por ejemplo -->
    <Fab icon="fa-save" @on-click="saveEntry" /> 
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
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
            entryData: null,
            localImage: null,
            file: null
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
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        async saveEntry() {
            new Swal({
                title: "Please wait",
                allowOutsideClick: false
            })
            Swal.showLoading()

            if(this.entryData.id){
                // update
                await this.updateEntry(this.entryData)
            }else{
                //create new entry
               const resp = await this.createEntry(this.entryData)

               this.$router.push({name: 'entry', params: {id: resp}})
            }

            Swal.fire('Saved', 'Entry was successfully saved', 'success')
        },
        async onDeleteEntry(){
            const result = await Swal.fire({
                title: 'Are you sure you want to delete?',
                text: 'Once it is deleted, it will not be available in the database',
                showDenyButton: true,
                confirmButtonText: 'Yes, delete it'
            })

            if(result.isConfirmed) {
                new Swal({
                    title: 'Please wait',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                await this.deleteEntry(this.entryData.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Deleted', '', 'success')
            }
        },

        onSelectedImage(event) {
            const file = event.target.files[0]

            if(!file){
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            // FileReader is native in js
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
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