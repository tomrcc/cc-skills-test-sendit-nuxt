<template>
    <header>
         <nav
            class="navbar navbar-expand-lg position-fixed w-100 zindex-dropdown"
            id="mainnavigationBar"
         >
            <div class="container-fluid">
               <NuxtLink to="/" class="navbar-brand" exact>
                  <img format="webp" :src="nav.logo" alt="Nav-Logo" v-if="nav.logo" data-editable="image" data-prop-src="@data[nav].logo"/>
               </NuxtLink>
               <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
               >
                  <span class="navbar-toggler-default">
                     <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <line
                           x1="3.5"
                           y1="5.5"
                           x2="21.5"
                           y2="5.5"
                           stroke="#292D32"
                           stroke-width="3"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                        <line
                           x1="4.5"
                           y1="12.5"
                           x2="21.5"
                           y2="12.5"
                           stroke="#292D32"
                           stroke-width="3"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                        <line
                           x1="11.5"
                           y1="19.5"
                           x2="21.5"
                           y2="19.5"
                           stroke="#292D32"
                           stroke-width="3"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                     </svg>
                  </span>
                  <span class="navbar-toggler-toggled">
                     <svg
                        width="20"
                        height="20"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M21.5 6.5L6.5 21.5"
                           stroke="#404152"
                           stroke-width="3"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                        <path
                           d="M21.5 21.5L6.5 6.5"
                           stroke="#404152"
                           stroke-width="3"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                        />
                     </svg>
                  </span>
               </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav mx-auto mb-20 mb-lg-0" data-editable="array" data-prop="@data[nav].items">
                        <li class="nav-item" v-for="item in nav.items" data-editable="array-item">
                           <NuxtLink :to="item.link" class="nav-link">
                              <editable-text data-prop="text">{{ item.text }}</editable-text>
                           </NuxtLink>
                        </li>
                        <RawTemplate :html="NAV_ITEM_BLUEPRINT" />
                  </ul>
               </div>
               <div class="d-none d-lg-block">
                  <div class="nav-item">
                     <NuxtLink :to="nav.button.link" class="btn btn-sm btn-links" exact>
                        <editable-text data-prop="@data[nav].button.text">{{ nav.button.text }}</editable-text>
                     </NuxtLink>
                  </div>
               </div>
            </div>
         </nav>
      </header>
</template>

<script setup>
import navData from "../data/nav.json";

const nav = navData;

const NAV_ITEM_BLUEPRINT = `<li class="nav-item" data-editable="array-item"><a class="nav-link"><editable-text data-prop="text"></editable-text></a></li>`;
</script>
