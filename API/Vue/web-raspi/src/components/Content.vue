<template>
    <div class="content">
        <table>
            <tr class="title-content">
                <td>
                    Date
                </td>
                <td>
                    Produit
                </td>
                <td>
                    Quantité
                </td>

            </tr>

            <tr>
                <td>12/12/2022</td>
                <td>Adaptateur vidéo</td>
                <td>3</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name:'Content'
}
</script>

<style>
.content{   
    margin: 10px;
    height: 200px;;
    border: 3px solid #312052;
    background-color: whitesmoke;
}

.title-content {
    text-align: center;
}
td {
    width: 200px;
    text-align: center;
}
</style>