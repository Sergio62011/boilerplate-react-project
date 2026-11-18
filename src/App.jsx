import React from "react";

const App = () => {
  return (
    <>
      <header className="contenedor cabecera">
        <a href="" className="marca">
          Bitacora Espacial
        </a>
        <nav>
          <a href="#noticias">Noticias</a>
          <a href="https://www.nasa.gov/blogs/" target="_blank">
            Blogs de la Nasa
          </a>
          <a href="#acerca">Acerca</a>
        </nav>
      </header>
      <main className="contenedor" id="contenedor">
        <h1>Explora las noticias de espacio</h1>
        <p className="introduccion">
          Misiones, descubrimientos y próximos destinos
        </p>
        <section id="noticias" aria-labelledby="titulo-noticias">
          <h2 id="titulo-noticias">últimas noticias</h2>
          <div className="grid-noticias"></div>
        </section>
      </main>
      <footer className="contenedor" id="acerca">
        <p>Datos de spaceflight New API</p>
      </footer>
    </>
  );
};

export default App;
