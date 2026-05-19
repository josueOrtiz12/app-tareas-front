import { Box, Stack, Typography } from '@mui/material';
import { AutoAwesome as MagicIcon } from '@mui/icons-material';
import { themeTokens } from "../../../styles/themeTokens";

export function WelcomePanel() {
  return (
    <Box sx={{
      flex: 1.1, 
      color: themeTokens.brand.white, 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'flex-start', 
      p: { xs: 4, md: 8 },
      position: 'relative', 
      background: `linear-gradient(135deg, ${themeTokens.brand.darkGradientStart} 0%, ${themeTokens.brand.darkGradientEnd} 100%)`,
      clipPath: { md: 'polygon(0% 0%, 92% 0%, 100% 50%, 92% 100%, 0% 100%)', xs: 'none' },
    }}>
      {/* Patrón de puntos decorativo */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1,
        backgroundImage: `radial-gradient(${themeTokens.brand.white} 0.8px, transparent 0.8px)`,
        backgroundSize: '24px 24px',
      }} />

      <Stack spacing={2} sx={{ zIndex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          {/* Usamos el token de acento para el icono */}
          <MagicIcon sx={{ color: themeTokens.brand.accent }} />
          <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 'bold', color: themeTokens.brand.accent }}>
            Sistema v2.0
          </Typography>
        </Box>
        
        <Typography variant="h3" fontWeight="800" sx={{ lineHeight: 1.2 }}>
          Hazlo <br /> 
          {/* Usamos el token de acento para la palabra clave */}
          <span style={{ color: themeTokens.brand.accent }}>Eficiente.</span>
        </Typography>
        
        <Typography variant="body1" sx={{ opacity: 0.7, maxWidth: '280px', pt: 1 }}>
          Accede a tu panel de control y gestiona tus operaciones con un solo click.
        </Typography>
      </Stack>
    </Box>
  );
}