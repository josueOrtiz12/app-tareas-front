import { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box
} from "@mui/material";
import { taskServices } from "../../../services/taskServices";
import type { Task } from "../../../types/task";

interface EditTaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdated: () => void;
}

const statusOptions = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_PROGRESO", label: "En Progreso" },
  { value: "COMPLETADA", label: "Completada" },
];

export function EditTaskDialog({ open, task, onClose, onUpdated }: EditTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDIENTE");
  const [taskLimit, setTaskLimit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.task_name);
      setDescription(task.task_description);
      setStatus(task.task_status);
      setTaskLimit(task.task_limit ? task.task_limit.split("T")[0] : "");
      setError("");
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Título y descripción son obligatorios");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const body: Record<string, string> = { title: title.trim(), description: description.trim(), status };
      if (taskLimit) body.taskLimit = taskLimit;
      await taskServices.update(task!.task_id, body);
      onUpdated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar tarea");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight={700}>Editar Tarea</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          {error && <Box sx={{ color: "error.main", fontSize: 14 }}>{error}</Box>}
          <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField label="Descripción" fullWidth multiline rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
          <TextField select label="Estado" fullWidth value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </TextField>
          <TextField label="Fecha Límite" type="date" fullWidth value={taskLimit} onChange={(e) => setTaskLimit(e.target.value)} InputLabelProps={{ shrink: true }} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="inherit">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={submitting}>
          {submitting ? "Guardando..." : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
