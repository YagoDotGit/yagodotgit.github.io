document.addEventListener("DOMContentLoaded", () => {
    // Buscamos todos los bloques de código que genera MkDocs/Pygments en ReadTheDocs
    const codeBlocks = document.querySelectorAll("div.codehilite, pre");

    codeBlocks.forEach((block) => {
        // Evitamos duplicar botones si ya existe uno
        if (block.querySelector(".copy-btn")) return;

        // Creamos el botón de copiar
        const button = document.createElement("button");
        button.className = "copy-btn";
        button.innerText = "Copiar";
        
        // Estilos básicos para que el botón luzca bien en la esquina del bloque
        button.style.position = "absolute";
        button.style.top = "6px";
        button.style.right = "6px";
        button.style.padding = "4px 8px";
        button.style.fontSize = "11px";
        button.style.cursor = "pointer";
        button.style.background = "#292929";
        button.style.color = "#ffffff";
        button.style.border = "1px solid #444";
        button.style.borderRadius = "4px";
        button.style.zIndex = "10";

        // Aseguramos que el contenedor del código permita posicionar el botón de forma absoluta
        if (getComputedStyle(block).position === "static") {
            block.style.position = "relative";
        }

        // Evento al hacer clic en el botón
        button.addEventListener("click", () => {
            // Extraemos el texto del bloque de código
            const codeElement = block.querySelector("code") || block.querySelector("pre");
            let codeText = codeElement ? codeElement.innerText : block.innerText;

            // Limpiamos por si acaso el texto del propio botón se cuela en la selección
            codeText = codeText.replace("Copiar", "").trim();

            // MAGIA PARA GODOT: Reemplaza bloques de 4 espacios al inicio de línea por un tabulador real (\t)
            codeText = codeText.replace(/^[ ]{4}/gm, '\t');

            // Copiamos al portapapeles del sistema operativo
            navigator.clipboard.writeText(codeText).then(() => {
                button.innerText = "¡Copiado!";
                setTimeout(() => {
                    button.innerText = "Copiar";
                }, 2000);
            }).catch(err => {
                console.error("Error al intentar copiar el código: ", err);
            });
        });

        // Añadimos el botón dentro del bloque de código
        block.appendChild(button);
    });
});