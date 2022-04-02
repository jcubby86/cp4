<template>
  <div class="home">
    <div v-if="editing">
      <input v-model="collection.title" />
      <br />
      <textarea v-model="collection.description" placeholder="Description" />
    </div>
    <div v-else>
      <h1>{{ collection.title }}</h1>
      <p>{{ collection.description }}</p>
    </div>
    <button @click="deleteCollection">Delete Collection</button>
    <button @click="edit">{{caption}}</button>
    <ListComponent :path="'/items/'" :id="id" :name="'n Item'" />
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

button {
  margin: 10px 5px;
}

input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
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
import axios from "axios";
import ListComponent from "@/components/List.vue";
export default {
  name: "CollectionView",
  components: {
    ListComponent,
  },
  data() {
    return {
      id: "",
      collection: {},
      editing: false,
      caption: "Edit Collection",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getCollection();
  },
  methods: {
    async getCollection() {
      try {
        let response = await axios.get("/api/collection/" + this.id);
        this.collection = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCollection() {
      try {
        await axios.delete("/api/collections/" + this.id);
        this.$router.back();
      } catch (error) {
        console.log(error);
      }
    },
    async edit() {
      if (this.editing) {
        try {
          await axios.put("/api/collections/" + this.id, this.collection);
          this.editing = false;
          this.caption = "Edit Collection";
        } catch (error) {
          console.log(error);
        }
      } else {
        this.editing = true;
        this.caption = "Save Changes";
      }
    }
  },
};
</script>