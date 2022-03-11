const selector = (val) => document.querySelector(val);
const btnVocal = selector("#btn-Vocal"); // Selectores para los botones
const btnConsonante = selector("#btn-Consonante");
const btnMostrar = selector("#btn-mostrar");
const btnReplay = selector("#btn-replay");
const zonaTexto = selector("#zonaTexto");
const listaPalabras = selector("#listaPalabras");

let consonantes = "bcdfghjklmnpqrstvwxyz";
let vocales = "aeiou";
let maximo = 9; //maximo nº de letras a pedir

//Funcion para controlar los disabled de los botones

const buttonsDisabled = () => {
  btnVocal.disabled = true;
  btnConsonante.disabled = true;
  btnMostrar.disabled = false;
};

// Ofrece una vocal aleatoria de la variable vocales y luego la muestra en el cuadro de texto
const mostrarVocal = () => {
  console.log(selector("#cuadroLetras").value.length);

  let vocalAleatoria = vocales[Math.floor(Math.random() * vocales.length)];
  console.log(vocalAleatoria);
  selector("#cuadroLetras").value += vocalAleatoria;

  // Funcion para comprar el nº de letras en el cuadro de Texto y bloquear los botones llegado el maximo
  if (selector("#cuadroLetras").value.length >= maximo) {
    buttonsDisabled();
  }
};

// Ofrece una consonante aleatoria de la variable consonantes y luego la muestra en el cuadro de texto
const mostrarConsonante = () => {
  console.log(selector("#cuadroLetras").value.length);
  let consonanteAleatoria =
    consonantes[Math.floor(Math.random() * consonantes.length)];
  console.log(consonanteAleatoria);
  selector("#cuadroLetras").value += consonanteAleatoria;

  // Comprobar
  if (selector("#cuadroLetras").value.length >= maximo) {
    buttonsDisabled();
  }
};

// Funcion para mostrar las palabras que coinciden en pantalla
const mostrarPalabras = (palabrasEncontradas) => {
  btnMostrar.disabled = true;
  btnReplay.disabled = false;
  let Arraypalabras = [];
  if (palabrasEncontradas.length == 0) {
    listaPalabras.innerHTML =
      "<h2>Lo siento, pero no existen palabras coincidentes</h2>";
  } else {
    listaPalabras.innerHTML += `<h2> Palabras Encontradas</h2>`;
    palabrasEncontradas.forEach((palabra) => {
      listaPalabras.innerHTML += `
    <li >${palabra}</li>`;
    });
  }
};

// Volver a jugar no bloquear boton de replay, por si al usuario no le gustan las letras que le han salido
const replay = () => {
  selector("#cuadroLetras").value = "";
  btnVocal.disabled = false;
  btnConsonante.disabled = false;
  btnMostrar.disabled = true;
  listaPalabras.innerHTML = "";
  btnReplay.disabled = true;
};

//Script para comprobar palabras

const checkWord = (letras, palabra) => {
  const palabras = letras.toLowerCase().split("").sort();
  const array = palabra.toLowerCase().split("").sort();

  for (let i = 0; i < array.length; i++) {
    let e = array[i];

    if (palabras.length > 1 && i < array.length - 1) {
      if (palabras[0] == e) {
        palabras.shift();
      } else {
        if (palabras[0] > e) {
          return false;
        } else {
          palabras.shift();
          i--;
        }
      }
    } else {
      if (palabras[0] == e && i == array.length - 1) return true;
      else return false;
    }
  }
};
const useCheck = (text1, text2) => {
  return checkWord(text1, text2);
};

// usando el script busca las palabras que coincidan con las letras del usuario y las añade a un array para luego mostrarlas
const buscarPalabras = () => {
  let words = [];

  diccionario.forEach((palabra) => {
    useCheck(selector("#cuadroLetras").value, palabra)
      ? !words.includes(palabra)
        ? words.push(palabra)
        : null
      : null;
  });
  console.log(words);
  mostrarPalabras(words);
};

// Funcion para ocultar la pantalla de informacion y sacar la pantalla de juego.
const cambioPantallas = () => {
  document.getElementById("pantallaInicio").style.display = "none";
  document.getElementById("pantallaJuego").style.display = "block";
};

// Inversa de cambioPantallas para volver a ver la explicacion

const cambioPantallas2 = () => {
  document.getElementById("pantallaInicio").style.display = "block";
  document.getElementById("pantallaJuego").style.display = "none";
};