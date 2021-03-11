<template>
<div class="sticky-top">
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#"><img src="../assets/images/Groupomania_Logos/icon-left-font-monochrome-white.png" alt="Groupomania" class="header_img" /></b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item> <router-link to="/" class="text-white">Accueil</router-link></b-nav-item>
                <b-nav-item><router-link to="/about" class="text-white">About</router-link></b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</div>
</template>

<script>

export default {
    name: 'Header',
}
</script>
<style>
.header_img{
    max-width: 150px;
}
</style>