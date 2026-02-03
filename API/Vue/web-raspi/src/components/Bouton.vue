<template>
<div class="bouton">
    <div class="msg-bouton">{{ msg }}</div>
</div>
    
</template>

<script>
export default {
    name: 'Bouton',
    props: {
        msg: String
  }
}
</script>

<style>
.bouton {
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
    width: 200px;
    height: 60px;
    line-height: 60px;
    border: 3px solid #4e4e4e;
    border-radius: 3px;
    cursor: pointer;
}

.bouton:hover {
    background-color: #4e4e4e;
    border: 3px solid whitesmoke;
    transition: 0.3s;
}

.msg-bouton {
    color: black;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1.5rem;
}

.msg-bouton:hover {
    color: whitesmoke;
}

</style>