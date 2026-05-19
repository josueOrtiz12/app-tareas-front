import { Box, Card, Fade } from '@mui/material';
import { themeTokens } from '../../../styles/themeTokens';

export function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${themeTokens.brand.main} 0%, ${themeTokens.brand.secondary} 100%)`,
      
      '&::before': {
        content: '""', position: 'absolute', width: '600px', height: '600px',
        top: '-200px', left: '-100px', borderRadius: '50%',
        background: `radial-gradient(circle, ${themeTokens.effects.deepBlue} 0%, ${themeTokens.effects.deepBlueSecondary} 70%)`,
        filter: 'blur(60px)', zIndex: 0,
      },
      '&::after': {
        content: '""', position: 'absolute', width: '500px', height: '500px',
        bottom: '-150px', right: '-100px', borderRadius: '50%',

        background: `radial-gradient(circle, ${themeTokens.effects.lightBlue} 0%, ${themeTokens.effects.deepBlueSecondary} 70%)`,
        filter: 'blur(50px)', zIndex: 0,
      },
      p: 2
    }}>
      <Fade in={true} timeout={800}>
        <Card sx={{
          maxWidth: 1050, width: '100%', display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden', borderRadius: 5, zIndex: 1,
          boxShadow: `0 25px 50px -12px ${themeTokens.effects.boxShadow}`,
          border: `1px solid ${themeTokens.effects.glassBorder}`,
        }}>
          {children}
        </Card>
      </Fade>
    </Box>
  );
}