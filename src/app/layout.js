import StyledComponentsRegistry from '../../lib/registry';
import './globals.css';
import MoviesProvider from '@/context/MoviesContext';

export const metadata = {
  title: 'Movies App',
  description: 'A simple app app to browse through different movies'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <MoviesProvider>{children}</MoviesProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
