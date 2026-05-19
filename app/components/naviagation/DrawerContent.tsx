import { Box, Toolbar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MENU_ITEMS } from './menuConfig'; 
import { LogoutItem } from './LogoutItem'; 
import { Fragment } from 'react';
import { Link } from 'react-router';
import { themeTokens } from '../../styles/themeTokens';

export const DrawerContent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Toolbar />
    <Divider sx={{ borderColor: themeTokens.sidebar.divider }} />
    
    {/* Lista de navegación principal */}
    <List sx={{ flexGrow: 1, color: themeTokens.sidebar.text }}>
      {MENU_ITEMS.map((item, index) => (
        <Fragment key={item.text || index}>
          <ListItem disablePadding>
            <ListItemButton sx={{
              '&:hover': { backgroundColor: themeTokens.sidebar.hover },
              '&.Mui-selected': { backgroundColor: themeTokens.sidebar.selected },
              '&.Mui-selected:hover': { backgroundColor: themeTokens.sidebar.selectedHover },
            }}
            component={Link}
            to={item.path}
            >
              <ListItemIcon>
                <item.icon sx={{ color: themeTokens.sidebar.accent }} />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
          
          {/* Divider entre elementos, excepto después del último */}
          {index < MENU_ITEMS.length - 1 && (
            <Divider 
              variant="middle" 
              component="li" 
              sx={{ borderColor: themeTokens.sidebar.divider, my: 0.5 }} 
            />
          )}
        </Fragment>
      ))}
    </List>

    <Divider sx={{ borderColor:  themeTokens.sidebar.divider }} />

    {/* Sección de acciones (Logout) */}
    <List>
      <LogoutItem />
    </List>
  </Box>
);