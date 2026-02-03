<template>
 <div class="navigation">
    <ul>
        <li>Home</li>
        <li>Spec</li>
        <li>Dashboard</li>
        <li>Contact</li>
    </ul>
    </div>
</template>
<script>
export default {
  name: 'Navigation',
}
</script>

<style>
.navigation {
    background-color: #c2cadd;
    color: black;
    padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>