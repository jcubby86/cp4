<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
    </nav>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">
      <a href="https://github.com/jcubby86/cp4">
        <h5>View GitHub Repository here</h5>
      </a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: black;
}

nav a.router-link-exact-active {
  color: darkblue;
}

.footer{
    position:fixed;
    bottom: 0;
    width: 100%;
    height: 30px;
    background-color: darkblue;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: solid lightblue 5px;
    margin-left: -10px;
}
.footer a{
    color: #fff;
    text-decoration: none;
    margin-top: 10px;
}
.footer a:hover{
    text-decoration: underline;
}

.content {
  margin-bottom: 50px;
}

</style>
