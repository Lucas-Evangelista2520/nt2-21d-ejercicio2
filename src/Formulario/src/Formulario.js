import { ref, computed } from 'vue'

export default {
  name: 'Formulario',
  setup() {
    // ---- filtros controlados por v-model ----
    const filtroNombre = ref('') // nombre o nombre + apellido (parcial)
    const filtroDni = ref('')    // solo dígitos (parcial)

    // ---- datos base ----
    const personas = ref([
      { nombre: "Daniel", apellido: "Sanchez", correo: "danielsanchez68@hotmail.com", dni: "20442873" },
      { nombre: "Juan",   apellido: "Perez",   correo: "j@p.gmail.com",               dni: "12345678" },
      { nombre: "Ana",    apellido: "Suarez",  correo: "a@s.gmail.com",               dni: "87654321" },
      { nombre: "Lucas",  apellido: "Evangelista", correo: "lucasevangelista2520@gmail.com", dni: "43447588" },
    ])

    // helpers para normalizar
    const norm = (s) =>
      String(s || '')
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') 
        .trim()

    const digits = (s) => String(s || '').replace(/\D+/g, '') 

    // ---- filtrado combinado ----
    const personasFiltradas = computed(() => {
      const qNom = norm(filtroNombre.value)  
      const qDni = digits(filtroDni.value)   

      return personas.value.filter((p) => {
        const nombreCompleto = norm(`${p.nombre} ${p.apellido}`)
        const dni = digits(p.dni)

        const pasaNombre = qNom === '' || nombreCompleto.includes(qNom)
        const pasaDni    = qDni === '' || dni.includes(qDni)

        return pasaNombre && pasaDni
      })
    })

    const getNombreCompleto = (p) => `${p.nombre} ${p.apellido}`

    const limpiar = () => { filtroNombre.value = ''; filtroDni.value = '' }

    const mostrarAlerta = () => {
    const cortoNombre = filtroNombre.value.length > 0 && filtroNombre.value.length < 3
    const cortoDni = filtroDni.value.length > 0 && filtroDni.value.length < 3
    return cortoNombre || cortoDni
    }

    return {
      // estado expuesto al template
        filtroNombre,
        filtroDni,
        personasFiltradas,
        getNombreCompleto,
        limpiar,
        mostrarAlerta
    }
  }
}
