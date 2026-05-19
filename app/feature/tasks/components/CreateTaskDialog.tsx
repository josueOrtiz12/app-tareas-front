import { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box
} from "@mui/material";
import { taskServices } from "../../../services/taskServices";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const statusOptions = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_PROGRESO", label: "En Progreso" },
  { value: "COMPLETADA", label: "Completada" },
];

export function CreateTaskDialog({ open, onClose, onCreated }: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("PENDIENTE");
  const [taskLimit, setTaskLimit] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      await taskServices.create(body);
      setTitle("");
      setDescription("");
      setStatus("PENDIENTE");
      setTaskLimit("");
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear tarea");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight={700}>Nueva Tarea</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          {error && <Box sx={{ color: "error.main", fontSize: 14 }}>{error}</Box>}
          <TextField label="Título" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
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
          {submitting ? "Creando..." : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
