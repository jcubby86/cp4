<template>
  <div class="home">
    <h1>My Collections</h1>
    <ListComponent :path="'/collections/'" :id="''" :name="' Collection'"/>
  </div>
</template>

<style scoped>
  .image h2 {
    font-style: italic;
  }
  
  /* Masonry */
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  .image-gallery {
    column-gap: 1.5em;
  }
  
  .image {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
  }
  
  .image img {
    width: 100%;
  }
  
  /* Masonry on large screens */
  @media only screen and (min-width: 1024px) {
    .image-gallery {
      column-count: 4;
    }
  }
  
  /* Masonry on medium-sized screens */
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    .image-gallery {
      column-count: 3;
    }
  }
  
  /* Masonry on small screens */
  @media only screen and (max-width: 767px) and (min-width: 540px) {
    .image-gallery {
      column-count: 2;
    }
  }
  </style>

<script>
  import ListComponent from '@/components/List.vue'
  export default {
    name: 'HomeView',
    components: {
      ListComponent
    }
  }
</script>