/* eslint-disable perfectionist/sort-imports */
import './global.css'; //src

import { useScrollToTop } from './hooks/use-scroll-to-top'; //src

import Router from './routes/sections'; //src
import ThemeProvider from './theme';  //src

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
