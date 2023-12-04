<template>
  <div class="entry-container mb-3 pointer p-2" @click="$router.push({name: 'entry', params: {id: entry.id}})">
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ getDay }} </span>
      <span class="mx-1 fs-5">{{getNameMonth}} </span>
      <span class="mx-2 fw-light">{{getYear}}, {{getNameDay}}</span>
    </div>
    <div class="entry-description">
      {{shortText}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    shortText() {
      return (this.entry.text.length > 150)
        ? this.entry.text.substring(0, 150) + '...'
        : this.entry.text
    },
    getDay() {
      return new Date(this.entry.date).getDate()
    },
    getNameMonth() {
      const date = new Date(this.entry.date)

      const month = new Intl.DateTimeFormat("es-ES", { month: "short" }).format(date)

      return month[0].toUpperCase() + month.substring(1)
    },
    getYear() {
      return new Date(this.entry.date).getFullYear()
    },
    getNameDay() {
      const date = new Date(this.entry.date)

      const day = new Intl.DateTimeFormat("es-ES", { weekday: "long" }).format(date)

      return day[0].toUpperCase() + day.substring(1)
    }
  }
};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #243e24;
  transition: 0.2s all ease-in;
  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all ease-in;
  }

  .entry-description{
    font-size: 12px;
  }

}
</style>