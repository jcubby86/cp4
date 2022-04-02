<template>
  <div>
    <div class="info">
      <div v-if="editing">
        <input v-model="item.title" />
        <br />
        <textarea v-model="item.description" placeholder="Description" />
      </div>
      <div v-else>
        <h1>{{ item.title }}</h1>
        <p>{{ item.description }}</p>
      </div>
      <img :src="item.path" />
      <br>
      <button @click="deleteItem">Delete Item</button>
      <button @click="edit">{{ caption }}</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ItemView",
  data() {
    return {
      item: {},
      id: "",
      editing: false,
      caption: "Edit Item",
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getItem();
  },
  methods: {
    async getItem() {
      try {
        let response = await axios.get("/api/item/" + this.id);
        this.item = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem() {
      try {
        await axios.delete("/api/items/" + this.id);
        this.$router.back();
      } catch (error) {
        console.log(error);
      }
    },
    async edit() {
      if (this.editing) {
        try {
          await axios.put("/api/items/" + this.id, this.item);
          this.editing = false;
          this.caption = "Edit Item";
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

<style scoped>
.info img {
  border: 1px solid #333;
  width: 100%;
  object-fit: cover;
}

.info {
  margin: 0 10px 50px;
}

.related h2 {
  margin-bottom: 0;
  text-decoration: underline;
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

@media only screen and (min-width: 500px) {
  .info img {
    height: 500px;
    width: 500px;
    object-fit: cover;
  }
}
</style>
