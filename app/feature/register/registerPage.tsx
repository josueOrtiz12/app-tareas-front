import * as React from 'react';
import { Form, useActionData } from "react-router";
import { Box, Button, TextField, Typography, Alert, Stack, InputAdornment, IconButton } from '@mui/material';
import { EmailOutlined as EmailIcon, LockOutlined as LockIcon, Person as PersonIcon } from '@mui/icons-material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { LoginLayout } from '../login/components/LoginLayout';
import { WelcomePanel } from '../login/components/WelcomePanel';
import { themeTokens } from '../../styles/themeTokens';

export function RegisterPage() {
  const actionData = useActionData() as { error?: string } | undefined;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  return (
    <LoginLayout>
      <WelcomePanel />

      <Box sx={{ flex: 1, p: { xs: 4, md: 8 }, bgcolor: themeTokens.brand.white }}>
        <Stack spacing={1} sx={{ mb: 5 }}>
          <Typography variant="h4" fontWeight="700" color={themeTokens.brand.darkGradientStart}>
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary">Regístrate para empezar.</Typography>
        </Stack>

        {actionData?.error && (
          <Alert severity="error" variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            {actionData.error}
          </Alert>
        )}

        <Form method="post" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TextField
            fullWidth name="user_name" label="Nombre"
            InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>) }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: themeTokens.ui.bodyBg } }}
          />

          <TextField
            fullWidth name="email" label="Email"
            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: themeTokens.ui.bodyBg } }}
          />

          <TextField
            fullWidth name="password" label="Contraseña" type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: themeTokens.ui.bodyBg } }}
          />

          <TextField
            fullWidth name="confirmPassword" label="Confirmar Contraseña" type={showConfirm ? 'text' : 'password'}
            InputProps={{
              startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: themeTokens.ui.bodyBg } }}
          />

          <Button
            type="submit" variant="contained" size="large"
            sx={{
                py: 1.8, borderRadius: 3, fontWeight: '700',
                background: `linear-gradient(45deg, ${themeTokens.brand.darkGradientStart} 30%, ${themeTokens.brand.darkGradientEnd} 90%)`,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  background: themeTokens.brand.main
                },
                transition: 'all 0.2s'
            }}
          >
            Registrarse
          </Button>
        </Form>
      </Box>
    </LoginLayout>
  );
}
