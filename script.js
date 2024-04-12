const categorias = {
    facil: {
        animales: ['perro', 'gato', 'pez', 'pajaro', 'conejo'],
        comida: ["pizza", "hamburguesa", "ensalada", "sopa", "tacos"],
        frutas: ['manzana', 'pera', 'uva', 'fresa', 'platano']
    },
    medio: {
        animales: ['murcielago', 'elefante', 'hipopotamo', 'tiburon', 'serpiente'],
        comida: ["sushi", "lasaña", "pollo", "pasta", "arroces"],
        frutas: ['guayaba', 'higo', 'lichi', 'mango', 'nispero']
    },
    dificil: {
        animales: ['ornitorrinco', 'quiroptero', 'axolote', 'coendou', 'gnatostoma'],
        comida: ["salmón", "risotto", "souffle", "caviar"],
        frutas: ['durion', 'noni', 'rambutan', 'salak', 'abiu']
    }
};
let categoriaseleccionada;
let palabraspornivel;
let palabraSecreta;
let palabraOculta;
let intentos = 0;

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    playButton.addEventListener('click', mostrarCategorias);

    const categoriasButtons = document.querySelectorAll('.categoria-btn');
    categoriasButtons.forEach(button => {
        button.addEventListener('click', function () {
            categoriaseleccionada = this.parentNode.id;
            iniciarJuego();
        });

        const nivelesButtons = document.querySelectorAll(`.nivel-btn`);
        nivelesButtons.forEach(nivel => {
            nivel.addEventListener('click', function () {
                niveless(this.parentNode.id); // Obtener directamente el ID del botón de nivel
            });
        });

    });
});



function mostrarCategorias() {
    document.getElementById('categorias').style.display = 'block';
    document.getElementById('categorias').style.overflowY= 'auto';
    document.getElementById('categorias').style.display = 'flex'
    document.getElementById('juego').style.display = 'none';
    document.querySelector('.iniciar').style.display = 'none';

    intentos = 0;
}
function iniciarJuego() {
    document.getElementById('categorias').style.display = 'none';
    document.getElementById('niveles').style.display = 'block';
    document.getElementById('niveles').style.display = 'flex';

}


function niveless(nivel) {
    if (nivel === 'facil' || nivel === 'medio' || nivel === 'dificil') {
        // Verificar si la categoría y el nivel son válidos
        if (categorias[nivel] && categorias[nivel][categoriaseleccionada]) {
            palabraspornivel = categorias[nivel][categoriaseleccionada];
            // Elegir una palabra aleatoria de la lista de palabras de la categoría y el nivel seleccionados
            palabraSecreta = palabraspornivel[Math.floor(Math.random() * palabraspornivel.length)];
            // Mostrar la palabra oculta y otros elementos del juego
            palabraOculta = '_'.repeat(palabraSecreta.length);
            document.getElementById('palabra').textContent = palabraOculta;
            document.getElementById('intentos').textContent = '';
            document.getElementById('botones').innerHTML = 'abcdefghijklmnñopqrstuvwxyz'.split('').map(letra =>
                `<button class="button button-${letra}" onclick="comprobarLetra('${letra}')">${letra}</button>`
            ).join('');
            // Mostrar el juego y ocultar los niveles

        }
        document.getElementById('juego').style.display = 'block';
        document.getElementById('juego').style.overflowY = 'auto';
        document.getElementById('niveles').style.display = 'none';
    }
}


console.log(palabraspornivel)
function comprobarLetra(letra) {
    if (palabraSecreta.includes(letra)) {
        let nuevaPalabra = '';
        for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra || palabraOculta[i] === letra) {
                nuevaPalabra += palabraSecreta[i];
            } else {
                nuevaPalabra += palabraOculta[i];
            }
        }
        palabraOculta = nuevaPalabra;
        document.getElementById('palabra').textContent = palabraOculta;

    } else {
        intentos++;
        document.getElementById('intentos').textContent = `Intentos: ${intentos}`;
    }


    if (palabraOculta === palabraSecreta) {
        setTimeout(() => {
            if (palabraOculta === palabraSecreta) {

                // alert('¡Ganaste!');
                document.getElementById("winner").style.display = "block"
                setTimeout(reiniciarJuego, 4000)
            }
        }, 1000)
        desactivarBotones()

    }

    if (intentos >= 8) {

        setTimeout(() => {
            if (intentos >= 8) {
                // alert('¡Perdiste! La palabra era: ' + palabraSecreta); 
                document.getElementById("perdiste").style.display = "block";
                document.getElementById("mensajePerdiste").textContent = '¡Perdiste! La palabra era: ' + palabraSecreta;
                

                setTimeout(reiniciarJuego, 4000);
            }

        }, 1000)
        desactivarBotones()
    }

    //   Ocultar todas las imágenes 

    if (intentos > 0 && intentos <= 8) {
        document.getElementById(`imagen-${intentos - 1}`).style.display = 'none';
    }

    // Mostrar la imagen correspondiente al nuevo intento
    if (intentos <= 8) {
        document.getElementById(`imagen-${intentos}`).style.display = 'block';
    }
    // Desactivar el botón de la letra seleccionada
    document.querySelector(`.button-${letra}`).style.display = "none"
}

function reiniciarJuego() {
    document.getElementById('juego').style.display = 'none';
    document.getElementById('niveles').style.display = 'none'
    document.querySelector('.iniciar').style.display = 'block';
    intentos = 0;
  
    document.getElementById("perdiste").style.display = 'none';
    document.getElementById("winner").style.display = 'none';

    // Ocultar todas las imágenes al reiniciar
    for (let i = 0; i <= 8; i++) {
        document.getElementById(`imagen-${i}`).style.display = 'none';
    }

    // Reiniciar el contenido de los intentos
    document.getElementById('intentos').textContent = '';
}


function desactivarBotones() {
    const botonesLetras = document.querySelectorAll('.button');
    botonesLetras.forEach(boton => {
        boton.disabled = true; // Desactivar cada botón de letra
    });
}
/* teclado random */
document.addEventListener('DOMContentLoaded', () => {
    const cuadrosLetra = document.querySelectorAll('.cuadro-letra');

    cuadrosLetra.forEach(cuadro => {
        cuadro.addEventListener('mouseenter', () => {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            cuadro.style.backgroundColor = randomColor;
        });
    });
});

