# Plataforma Deportiva - Liga de Fútbol Formativo

Una plataforma web moderna desarrollada en Next.js para la gestión de ligas de fútbol formativo infantil en Chile.

## Características

### 🏠 Dashboard Principal
- Vista general con estadísticas de clubes, partidos y jugadores
- Tabla de posiciones por liga (masculina/femenina)
- Próximos partidos programados
- Información de clubes participantes

### 👥 Perfiles de Usuario

#### 🏛️ Perfil Administrador
- Gestión completa de usuarios y roles
- Control total sobre clubes, partidos y jugadores
- Exportación de datos del sistema
- Configuración y mantenimiento del sistema

#### 🏆 Perfil Liga
- Dashboard de gestión de liga
- Creación y administración de clubes
- Programación y gestión de partidos
- Visualización de estadísticas completas
- Gestión de fixture y resultados

#### ⚽ Perfil Club
- Dashboard específico del club
- Gestión de jugadores (agregar, editar, eliminar)
- Visualización de partidos del club
- Información y estadísticas del club

## Tecnologías Utilizadas

- **Frontend**: Next.js 14 con App Router
- **Styling**: Tailwind CSS + CSS personalizado
- **Estado**: React Context API
- **Persistencia**: LocalStorage (escalable a base de datos)
- **Autenticación**: Sistema de login por roles
- **Responsive**: Diseño adaptativo para todos los dispositivos

## Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd plataforma-deportiva
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## Usuarios de Prueba

### Administrador
- **Usuario**: `admin`
- **Contraseña**: `admin123`
- **Acceso**: Panel completo de administración

### Gestor de Liga
- **Usuario**: `liga_manager`
- **Contraseña**: `liga123`
- **Acceso**: Gestión de liga y clubes

### Club Los Cóndores
- **Usuario**: `condores_club`
- **Contraseña**: `condores123`
- **Acceso**: Gestión del club específico

### Club Estrella del Sur
- **Usuario**: `estrella_club`
- **Contraseña**: `estrella123`
- **Acceso**: Gestión del club específico

## Estructura del Proyecto

```
plataforma-deportiva/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── admin/             # Panel de administración
│   │   ├── club-dashboard/    # Dashboard de club
│   │   ├── league-dashboard/  # Dashboard de liga
│   │   ├── login/            # Página de login
│   │   ├── layout.js         # Layout principal
│   │   ├── page.js           # Página de inicio
│   │   └── globals.css       # Estilos globales
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   ├── DashboardCards.js
│   │   ├── ClubCard.js
│   │   ├── MatchCard.js
│   │   ├── StandingsTable.js
│   │   └── Modal.js
│   ├── context/             # Context API
│   │   └── DataContext.js
│   └── data/               # Datos iniciales
│       └── ligaData.js
├── public/                 # Archivos estáticos
├── tailwind.config.js     # Configuración de Tailwind
├── next.config.js         # Configuración de Next.js
└── package.json
```

## Funcionalidades Principales

### Gestión de Clubes
- Registro de nuevos clubes
- Edición de información del club
- Asignación de categorías y ligas
- Gestión de contactos

### Gestión de Jugadores
- Registro de jugadores por club
- Seguimiento de estadísticas (goles, posición)
- Categorización por edad
- Historial de participación

### Gestión de Partidos
- Programación de encuentros
- Registro de resultados
- Fixture automático
- Filtros por liga, fecha y club

### Sistema de Usuarios
- Autenticación por roles
- Permisos diferenciados
- Sesiones persistentes
- Gestión de accesos

## Escalabilidad

El proyecto está diseñado para ser escalable:

- **Base de Datos**: Fácil migración de LocalStorage a PostgreSQL/MySQL
- **API**: Estructura preparada para integración con backend
- **Autenticación**: Compatible con JWT y sistemas externos
- **Deployment**: Listo para Vercel, Netlify o servidores propios

## Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción
npm run build

# Producción
npm start

# Linting
npm run lint
```

### Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico o consultas sobre el proyecto, contactar a través de:
- Email: soporte@ligafutbol.cl
- Issues en GitHub

---

**Desarrollado para el fomento del deporte formativo en Chile** 🇨🇱⚽
