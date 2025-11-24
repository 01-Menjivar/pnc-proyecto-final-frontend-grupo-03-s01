# 💻 Marketplace UCA

### 🛒 ¿Qué es Marketplace UCA?
Es mucho más que una tienda en línea; es el **hub digital exclusivo** para el comercio dentro de nuestra universidad. Se trata de un servicio web moderno y seguro donde los usuarios pueden publicar artículos, explorar un catálogo dinámico y gestionar sus compras y ventas con total confianza.

La plataforma no solo permite transacciones, sino que fomenta la interacción social: puedes **comentar** en las publicaciones, guardar en **favoritos** lo que te interesa, **calificar** tu experiencia y dejar **reseñas** visibles en los perfiles de otros usuarios. Además, para garantizar la calidad del contenido, contamos con un sistema donde los administradores revisan y aprueban las publicaciones antes de que salgan a la luz.

### 🎓 ¿Para quién está hecho?
Este espacio es **100% exclusivo para la comunidad UCA**.
Hemos diseñado un sistema de seguridad que valida el acceso únicamente a personas con un correo institucional activo (*@uca.edu.sv*). Esto está pensado para:
* **Estudiantes** que buscan materiales o quieren vender lo que ya no usan.
* **Emprendedores** dentro de la universidad que necesitan un escaparate digital confiable para sus productos.
* **Personal administrativo y docente** que desee participar en esta economía circular.

### 🧩 ¿Qué problema resuelve?
Marketplace UCA nace para cerrar la brecha entre la necesidad y la oportunidad dentro del campus:
1.  **Segunda vida a los recursos:** Muchos estudiantes acumulan libros, calculadoras y materiales valiosos que ya no utilizan. Aquí encuentran una forma sencilla de pasarlos a quien realmente los necesita.
2.  **Impulso al talento local:** Sabemos que hay mucho espíritu emprendedor en la UCA. Esta plataforma ofrece el escenario perfecto para que esos negocios crezcan dentro de un entorno seguro y conocido, sin el ruido de las redes sociales externas.

## ‼️ Consideraciones de software

El frontend ha sido desarrollado utilizando *React 19* junto con *Vite 7* para asegurar un alto rendimiento y una experiencia de desarrollo ágil.

### 🔖 Dependencias principales
- **Core:** React, React DOM, React Router DOM
- **Estilos y UI:** Tailwind CSS 4, Framer Motion, Lucide React, Heroicons, Tabler Icons, TSParticles
- **Gestión de Datos:** Axios, React Hook Form
- **Utilidades:** JWT Decode, DOMPurify, Lodash

### 📌 Función de estas dependencias

-   *Vite* → entorno de desarrollo y empaquetador de la aplicación.
-   *Tailwind CSS* → framework de utilidad para el diseño de la interfaz de usuario.
-   *Axios* → cliente HTTP para la comunicación con el backend y manejo de interceptores para tokens.
-   *Framer Motion* → biblioteca para gestionar las animaciones y transiciones de la interfaz.
-   *React Hook Form* → manejo eficiente de formularios y validaciones.
-   *DOMPurify* → sanitización de datos para prevenir ataques XSS.

> **⚠️ Importante:** La gestión de paquetes de este proyecto se realiza exclusivamente con **Yarn**. No se debe utilizar `npm` para evitar conflictos en el archivo de bloqueo (`yarn.lock`).

## ⚙️ Instalación

### 1️⃣ Preparación del entorno

Para ejecutar el cliente web, es necesario tener instalado **Node.js** y el gestor de paquetes **Yarn**.

### 2️⃣ Descarga del proyecto

Primero, clona el repositorio del frontend en tu máquina local:

```bash
git clone https://github.com/01-Menjivar/pnc-proyecto-final-frontend-grupo-03-s01.git
````

Accede a la carpeta del proyecto:

```bash
cd pnc-proyecto-final-frontend-grupo-03-s01
```

### 3️⃣ Instalación de dependencias

Ejecuta el siguiente comando para instalar todas las librerías necesarias. Recuerda usar **Yarn**:

```bash
yarn install
```

## 🛠️ Variables de Entorno

Antes de iniciar la aplicación, debes configurar las variables de entorno para conectar el frontend con el servicio backend.
Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:

```env
# API Backend
VITE_API_BASE_URL=http://localhost:8080/api  # URL base donde se ejecuta el servicio backend
```

**Descripción de la variable:**

  * `VITE_API_BASE_URL`: Define la dirección IP y el puerto donde está corriendo el servidor backend. Axios utiliza esta ruta para realizar todas las peticiones HTTP (Login, Productos, Usuarios, etc.).

## ▶️ Ejecución

Una vez instaladas las dependencias y configuradas las variables de entorno, puedes iniciar el servidor de desarrollo localmente.

Ejecuta el siguiente comando:

```bash
yarn dev
```

La terminal te indicará la URL local (generalmente `http://localhost:5173/`) donde puedes acceder a la aplicación desde tu navegador.
