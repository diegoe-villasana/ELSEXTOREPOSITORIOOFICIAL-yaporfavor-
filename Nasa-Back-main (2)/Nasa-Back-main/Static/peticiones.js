

async function nombre() {
    try {
        const response = await fetch("/lista");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            console.error("Retorno no exitososososo, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

async function infoasteroide(nombre) {
    try {
        const response = await fetch(`/infoasteroide?name=${encodeURIComponent(nombre)}`);;
        if (response.ok) {
            const data = await response.json();
            console.log("infoasteroide",data);
            return data
        } else {
            console.error("Retorno no exitoso en infoasteroides, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

async function infoasteroide_nombre(nombre) { 
    try {
        const response = await fetch(`/infoasteroide?name=${encodeURIComponent(nombre)}`);
        if (response.ok) {
            const data = await response.json();
            console.log("infoasteroide", data);

            // ✅ Mostrar solo el nombre en el HTML
            const nombreElemento = document.getElementById("Resultado_meteoro");
            if (nombreElemento) {
                nombreElemento.innerText = data.name; // solo el nombre
            }

            return data;
        } else {
            console.error("Retorno no exitoso en infoasteroides, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

async function infoasteroide_velocidad(nombre) { 
    try {
        const response = await fetch(`/velocidad?name=${encodeURIComponent(nombre)}`);
        if (response.ok) {
            const data = await response.json();
            console.log("velocidad", data);
            const nombreElemento = document.getElementById("Resultado_meteoro");
            if (nombreElemento) {
                nombreElemento.innerText = data.velocidad;
            }
            return data;
        } else {
            console.error("Retorno no exitoso en infoasteroides, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

async function infoasteroide_nombre(nombre) { 
    try {
        const response = await fetch(`/infoasteroide?name=${encodeURIComponent(nombre)}`);
        if (response.ok) {
            const data = await response.json();
            console.log("infoasteroide", data);

            // ✅ Mostrar solo el nombre en el HTML
            const nombreElemento = document.getElementById("Resultado_meteoro");
            if (nombreElemento) {
                nombreElemento.innerText = data.name; // solo el nombre
            }

            return data;
        } else {
            console.error("Retorno no exitoso en infoasteroides, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

async function todos(nombre) { 
    try {
        const response = await fetch(`/todos?name=${encodeURIComponent(nombre)}`);
        if (response.ok) {
            const data = await response.json();
            console.log("Datos completos:", data);

            const nombreElemento = document.getElementById("Resultado_meteoro");
            const velocidad = document.getElementById("Resultado_Velocidad");
            const tamano = document.getElementById("Resultado_tamano");
            const orbita = document.getElementById("Resultado_orbit_an");
            const escala = document.getElementById("Resultado_Escala");
            const energy = document.getElementById("impact-energy");
            

            if (nombreElemento) nombreElemento.innerText = data.nombreElemento;
            if (velocidad) velocidad.innerText = data.velocidad;
            if (tamano) tamano.innerText = data.tamano;
            if (orbita) orbita.innerText = data.orbita;
            if (escala) escala.innerText = data.scale_category;
            if (energy) energy.innerText = data.energy_megatons + " MT";
            

            return data;
        } else {
            console.error("Retorno no exitoso en /todos, código:", response.status);
        }
    } catch (error) {
        console.error("Error al hacer fetch:", error);
    }
}

