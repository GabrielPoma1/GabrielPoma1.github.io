let phrases = [];
let remainingPhrases = [];

// Cargar las frases desde un archivo de texto usando Fetch API
fetch('frases.txt')
    .then(response => response.text())
    .then(data => {
        phrases = data.split('\n').filter(phrase => phrase.trim() !== '');
        remainingPhrases = [...phrases]; // Copiar las frases para ir eliminando las usadas
        updatePhrase(); // Mostrar la primera frase al cargar
    })
    .catch(error => console.error('Error al cargar las frases:', error));

const phraseElement = document.getElementById('phrase');
const remainingCardsElement = document.getElementById('remaining-cards');
const cardElement = document.getElementById('card');

document.getElementById('next-card').addEventListener('click', function() {
    if (remainingPhrases.length === 0) {
        alert('No hay más tarjetas disponibles.');
        return;
    }

    // Aplicar la animación de salida
    cardElement.classList.add('fade-out');

    // Esperar hasta que la animación de salida termine antes de actualizar la tarjeta
    setTimeout(() => {
        updatePhrase(); // Actualizar la frase
        // Eliminar la clase de salida y agregar la clase de entrada
        cardElement.classList.remove('fade-out');
        cardElement.classList.add('fade-in');
    }, 300); // Duración de la animación de salida

    // Después de la animación de entrada, quitar la clase de entrada para poder aplicarla en el futuro
    setTimeout(() => {
        cardElement.classList.remove('fade-in');
    }, 600); // Duración de la animación total
});

// Función para seleccionar una frase aleatoria y actualizar la tarjeta
function updatePhrase() {
    if (remainingPhrases.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingPhrases.length);
        const selectedPhrase = remainingPhrases[randomIndex];

        // Actualizar la tarjeta con la nueva frase
        phraseElement.textContent = selectedPhrase;

        // Eliminar la frase ya mostrada del array
        remainingPhrases.splice(randomIndex, 1);

        // Actualizar el contador de tarjetas restantes
        remainingCardsElement.textContent = remainingPhrases.length;
    }
}
//http://localhost:8000/