import { useEffect, useState } from "react";
import NoticiaCard from "./components/NoticiaCard/NoticiaCard";

/* const noticias = [
  {
    id: 40897,
    title: "Insufficient Fuel Flow May Have Doomed Vulcan",
    authors: [
      {
        name: "Marcia Smith",
        socials: null,
      },
    ],
    url: "https://spacepolicyonline.com/news/insufficient-fuel-flow-may-have-doomed-vulcan/",
    image_url:
      "https://spacepolicyonline.com/wp-content/uploads/2026/03/Vulcan-schematic-300x161.jpg",
    news_site: "SpacePolicyOnline.com",
    summary:
      "The United Launch Alliance said today that insufficient fuel flow from the launch vehicle to the BE-4 engines may have led to the failure of Vulcan Leo 1 on Sunday. […]",
    published_at: "2026-11-18T19:27:13Z",
    updated_at: "2026-11-18T19:30:33.211413Z",
    featured: false,
    launches: [],
    events: [],
  },
  {
    id: 40896,
    title:
      "MAF EAP – Holidays – How to manage the BAH HUMBUG that tries to sneak in",
    authors: [
      {
        name: "NASA",
        socials: null,
      },
    ],
    url: "https://www.nasa.gov/centers-and-facilities/michoud/maf-eap/maf-eap-holidays-how-to-manage-the-bah-humbug-that-tries-to-sneak-in/",
    image_url:
      "https://www.nasa.gov/wp-content/uploads/2026/11/mafeap-holidays.jpeg",
    news_site: "NASA",
    summary:
      "Holidays are often a fun break during a busy year – a long weekend here and there is an event many of us can get behind.  However, when a short holiday break turns into a full holiday season, we know that this is a different “ball game”. Everyone has stress about something – some people […]",
    published_at: "2026-11-18T18:58:27Z",
    updated_at: "2026-11-18T19:00:21.719086Z",
    featured: false,
    launches: [],
    events: [],
  },
]; */

const App = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controlador = new AbortController();
    /* https://api.spaceflightnewsapi.net/v4/ */
    const api = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/, "");
    const tiempoLimite = setTimeout(() => {
      setError(
        "La API tardó demasiado en responder. Comprueba tu conexión y vuelve a intentarlo.",
      );
      setCargando(false);
      controlador.abort();
    }, 15000);

    async function cargarNoticias() {
      try {
        if (!api) throw new Error("Falta configurar URL de la API");
        const parametros = new URLSearchParams({ limit: "12" });
        const respuesta = await fetch(`${api}/articles/?${parametros}`, {
          signal: controlador.signal,
        });

        const datos = await respuesta.json();
        if (!Array.isArray(datos.results))
          throw new Error("La API devolvió un formato de noticias inesperado.");
        if (!controlador.signal.aborted) setNoticias(datos.results);
      } catch (error) {
        if (!controlador.signal.aborted) {
          setError(
            error instanceof Error
              ? error.message
              : "No se pudo conectar con la API",
          );
        }
      } finally {
        clearTimeout(tiempoLimite);
        if (!controlador.signal.aborted) setCargando(false);
      }
    }

    cargarNoticias();
    return () => {
      controlador.abort();
      clearTimeout(tiempoLimite);
    };
  }, []);

  return (
    <>
      <header className="contenedor cabecera">
        <a href="#contenido" className="marca">
          Bitacora Espacial
        </a>
        <nav aria-label="Principal">
          <a href="#noticias">Noticias</a>
          <a
            href="https://www.nasa.gov/blogs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blogs de la Nasa
          </a>
          <a href="#acerca">Acerca</a>
        </nav>
      </header>
      <main className="contenedor" id="contenido">
        <h1>Explora las noticias de espacio</h1>
        <p className="introduccion">
          Misiones, descubrimientos y próximos destinos
        </p>
        <section id="noticias" aria-labelledby="titulo-noticias">
          <h2 id="titulo-noticias">últimas noticias</h2>
          <div className="grid-noticias">
            {noticias.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                titulo={noticia.title}
                resumen={noticia.summary}
                imagen={noticia.image_url}
                fuente={noticia.news_site}
                fecha={noticia.published_at}
                enlace={noticia.url}
              />
            ))}
          </div>
        </section>
      </main>
      <footer className="contenedor" id="acerca">
        <p>Datos de spaceflight New API</p>
      </footer>
    </>
  );
};

export default App;
