import { ref, computed } from 'vue'

export default {
    name: 'Formulario',
    setup() {
    const criterioDeBusqueda = ref('')

    const personas = ref([
        { nombre: "Daniel", apellido: "Sanchez", correo: "danielsanchez68@hotmail.com", dni: "20442873" },
        { nombre: "Juan", apellido: "Perez", correo: "j@p.gmail.com", dni: "12345678" },
        { nombre: "Ana", apellido: "Suarez", correo: "a@s.gmail.com", dni: "87654321" },
        { nombre: "Lucas", apellido: "Evangelista", correo: "lucasevangelista2520@gmail.com", dni: "43447588" },
    ])

    const personasFiltradas = computed(() => {
        const q = criterioDeBusqueda.value.toLowerCase()
        return personas.value.filter((p) => {
            const registro = `${p.nombre} ${p.apellido} ${p.dni} ${p.correo}`.toLowerCase()
            return registro.includes(q)
        })
    })

    const getNombreCompleto = (p) => `${p.nombre} ${p.apellido}`

    return { criterioDeBusqueda, personasFiltradas, getNombreCompleto }
    },
}