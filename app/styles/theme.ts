import { createTheme } from '@mui/material/styles';
import { themeTokens } from './themeTokens';


declare module '@mui/material/styles' {
  interface Palette {
    sidebar: {
      main: string;
      text: string;
      accent: string;
      hover: string;
      selected: string;
      selectedHover: string;
      divider: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      main?: string;
      text?: string;
      accent?: string;
      hover?: string;
      selected?: string;
      selectedHover?: string;
      divider?: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: themeTokens.brand.main,
      contrastText: themeTokens.brand.text,
    },
    error: {
      main: themeTokens.sidebar.red,
    },
    background: {
      default: themeTokens.ui.bodyBg,
    },
    sidebar: {
      main: themeTokens.sidebar.bg,
      text: themeTokens.sidebar.text,
      accent: themeTokens.sidebar.accent,
      hover: themeTokens.sidebar.hover,
      selected: themeTokens.sidebar.selected,
      selectedHover: themeTokens.sidebar.selectedHover,
      divider: themeTokens.sidebar.divider,
    },
  },
  components: {
    // 1. Estilos Globales de la Tabla
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: themeTokens.table.headerBg,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: themeTokens.table.headerBg,
          color: themeTokens.table.headerText,
          fontWeight: 'bold',
        },
      },
    },
    // 2. Estilos Globales del Sidebar (Listas)
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: themeTokens.sidebar.text,
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: themeTokens.sidebar.hover,
          },
          '&.Mui-selected': {
            backgroundColor: themeTokens.sidebar.selected,
            color: themeTokens.sidebar.accent,
            '&:hover': {
              backgroundColor: themeTokens.sidebar.selectedHover,
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: themeTokens.sidebar.divider,
          opacity: 0.2, // Para que no sea un blanco tan sólido
        },
      },
    },
  },
});