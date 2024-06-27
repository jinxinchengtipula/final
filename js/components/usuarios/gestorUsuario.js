import Servicios from './servicios.js';

class GestorUsuarios {
    constructor() {
        this.servicios = new Servicios();
        this.init();
    }

    buscarPlatilloPorIngredientes(ingredientesSeleccionados) {
        return new Promise((resolve, reject) => {
            this.servicios.obtenerUsuarios('', (error, usuarios) => {
                if (error) {
                    reject(error);
                } else {
                    const platillosEncontrados = usuarios.filter(platillo =>
                        ingredientesSeleccionados.every(ingrediente => platillo.ingredientes.includes(ingrediente))
                    );
                    resolve(platillosEncontrados);
                }
            });
        });
    }

    mostrarPlatilloYFoto(platillo) {
        const resultado = document.getElementById('resultado');
        resultado.innerHTML = `
            <div class="resultado-platillo">
                <h2>Felicidades, has cocinado ${platillo.platillo}</h2>
                <div class="ingredientes-container">
                    <p>Ingredientes utilizados:</p>
                    <ul>
                        ${platillo.ingredientes.map(ingrediente => `<li class="ingrediente">${ingrediente}</li>`).join('')}
                    </ul>
                </div>
                <img src="img/${platillo.foto}" alt="${platillo.platillo}">
            </div>
        `;
    }

    init() {
        const formIngredientes = document.getElementById('formIngredientes');
        formIngredientes.addEventListener('submit', async (event) => {
            event.preventDefault();

            const ingredientesSeleccionados = Array.from(document.querySelectorAll('input[name="ingrediente"]:checked'))
                .map(input => input.value);

            if (ingredientesSeleccionados.length < 2) {
                alert('Debe seleccionar al menos 2 ingredientes para cocinar.');
                return;
            }

            try {
                const platillosEncontrados = await this.buscarPlatilloPorIngredientes(ingredientesSeleccionados);

                if (platillosEncontrados.length > 0) {
                    const primerPlatillo = platillosEncontrados[0];
                    this.mostrarPlatilloYFoto(primerPlatillo);
                } else {
                    const resultado = document.getElementById('resultado');
                    resultado.innerHTML = '<p>NO hay resultados</p>';
                }
            } catch (error) {
                console.error('Error al buscar platillos:', error);
            }
        });
    }
}

export default GestorUsuarios;
