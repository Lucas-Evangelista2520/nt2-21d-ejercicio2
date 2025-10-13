<script setup>
import { ref, computed } from 'vue'

const criterioDeBusqueda = ref('')

const personas = ref([
  {
    nombre: "Daniel",
    apellido: "Sanchez",
    correo: "danielsanchez68@hotmail.com",
    dni: "20442873"
  },
  {
    nombre: "Juan",
    apellido: "Perez",
    correo: "j@p.gmail.com",
    dni: "12345678"
  },
  {
    nombre: "Ana",
    apellido: "Suarez",
    correo: "a@s.gmail.com",
    dni: "87654321"
  },
  {
    nombre: "Lucas",
    apellido: "Evangelista",
    correo: "lucasevangelista2520@gmail.com",
    dni: "43447588"
  },
])

const personasFiltradas = computed(() => {
  return personas.value.filter((persona) => {
    let registroCompleto = `${persona.nombre} ${persona.apellido} ${persona.dni} ${persona.correo}`
    return registroCompleto.toLowerCase().includes(criterioDeBusqueda.value.toLowerCase())
  })
})

const getNombreCompleto = (persona) => `${persona.nombre} ${persona.apellido}`
</script>


<template>
  <div class="container-fluid mt-3">
    <input 
      type="text" 
      class="form-control" 
      v-model="criterioDeBusqueda"
      placeholder="Ingresar un criterio de búsqueda..." 
    />
    <br />

    <div class="card-deck m-0">
      <div class="row">
        <div class="col" v-for="persona in personasFiltradas" :key="persona.dni">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ getNombreCompleto(persona) }}</h5>
              <p class="card-text">dni {{ persona.dni }}</p>
              <a href="#" class="card-link">{{ persona.correo }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


