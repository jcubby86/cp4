<template>
  <div class="wrapper">
    <div class="items">
      <router-link
        class="item"
        v-for="item in items"
        :key="item._id"
        :to="path + item._id"
      >
        <div class="info">
          <h1>{{ item.title }}</h1>
        </div>
        <div class="image">
          <img :src="item.path" />
        </div>
      </router-link>
    </div>
    <br />
    <div class="heading">
      <h2>Add a{{ name }}</h2>
    </div>
    <div class="add">
      <div class="form">
        <input class="title" v-model="title" placeholder="Title" />
        <br />
        <textarea v-model="description" placeholder="Item Description" />
        <p></p>
        <input type="file" name="photo" @change="fileChanged" />
        <button @click="upload" :disabled="disableButton">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListComponent",
  props: {
    path: String,
    id: String,
    name: String,
  },
  data() {
    return {
      title: "",
      description: "",
      file: null,
      items: [],
    };
  },
  created() {
    this.getItems();
  },
  computed: {
    disableButton() {
      return this.file === null || this.title === "";
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
        await axios.post("/api" + this.path + this.id, {
          title: this.title,
          description: this.description,
          path: r1.data.path,
        });
        this.getItems();
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api" + this.path + this.id);
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api" + this.path + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 50px;
}

.item {
  margin: 10px;
  margin-top: 50px;
  width: 200px;
}

.item .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.item .image img {
  border: 2px solid #333;
  height: 200px;
  width: 200px;
  object-fit: cover;
}

.info {
  background: lightblue;
  color: #000;
  padding: 10px 30px;
  height: 40px;
}

.info h1 {
  font-size: 16px;
}

.add {
  display: flex;
  max-width: 90%;
  padding: 0 10px;
}

input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.title,
textarea {
  width: 100%;
  margin-bottom: 5px;
}
</style>