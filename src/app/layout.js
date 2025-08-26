import './globals.css';
import { DataProvider } from '../context/DataContext';

export const metadata = {
  title: 'Liga de Fútbol Formativo Infantil',
  description: 'Plataforma deportiva para la gestión de ligas de fútbol formativo en Chile',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <body>
        <DataProvider>
          {children}
        </DataProvider>
      </body>
    </html>
  );
}
