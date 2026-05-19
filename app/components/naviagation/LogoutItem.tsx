import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { Form } from "react-router";
import { themeTokens } from '../../styles/themeTokens';

export const LogoutItem = () => (
  <ListItem disablePadding>
    <Form action="/logout" method="post" style={{ width: '100%' }}>
      <ListItemButton 
        component="button" 
        type="submit"
        sx={{ 
          width: '100%', 
          textAlign: 'left', 
        
          color: themeTokens.sidebar.red,
          borderRadius: '8px',
          mx: 1, 
          width: 'calc(100% - 16px)', 
          '&:hover': { 
          
            backgroundColor: `${themeTokens.sidebar.red}1a`, 
            transform: 'translateX(4px)', 
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          <LogoutIcon sx={{ color: themeTokens.sidebar.red }} />
        </ListItemIcon>
        <ListItemText 
          primary="Cerrar Sesión" 
          primaryTypographyProps={{ 
            fontWeight: '600',
            fontSize: '0.9rem' 
          }} 
        />
      </ListItemButton>
    </Form>
  </ListItem>
);