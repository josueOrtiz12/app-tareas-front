import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, Chip
} from "@mui/material";
import type { Task } from "../../../types/task";

interface ViewTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
}

const statusColor: Record<string, "warning" | "info" | "success" | "default"> = {
  PENDIENTE: "warning",
  EN_PROGRESO: "info",
  COMPLETADA: "success",
};

export function ViewTaskDialog({ open, task, onClose }: ViewTaskDialogProps) {
  if (!task) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight={700}>{task.task_name}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box><Typography variant="caption" color="text.secondary">Descripción</Typography><Typography>{task.task_description || "—"}</Typography></Box>
          <Box><Typography variant="caption" color="text.secondary">Estado</Typography><Box sx={{ mt: 0.5 }}><Chip label={task.task_status.replace("_", " ")} color={statusColor[task.task_status] || "default"} size="small" /></Box></Box>
          <Box><Typography variant="caption" color="text.secondary">Fecha Límite</Typography><Typography>{task.task_limit ? new Date(task.task_limit).toLocaleDateString() : "—"}</Typography></Box>
          <Box><Typography variant="caption" color="text.secondary">Creada</Typography><Typography>{new Date(task.created_at).toLocaleDateString()}</Typography></Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} variant="contained">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
