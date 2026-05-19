import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import type { Task } from "../../../types/task";

interface DeleteTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onConfirm: () => void;
  submitting: boolean;
}

export function DeleteTaskDialog({ open, task, onClose, onConfirm, submitting }: DeleteTaskDialogProps) {
  if (!task) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={700}>Eliminar Tarea</DialogTitle>
      <DialogContent>
        <Typography>¿Estás seguro de eliminar la tarea <strong>{task.task_name}</strong>?</Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={submitting}>
          {submitting ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
