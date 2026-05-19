import { Box, TextField, MenuItem } from "@mui/material";

interface TaskFiltersProps {
  filters: { taskName: string; taskStatus: string };
  onFilterChange: (filters: { taskName: string; taskStatus: string }) => void;
}

const statusOptions = [
  { value: "", label: "Todos" },
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "EN_PROGRESO", label: "En Progreso" },
  { value: "COMPLETADA", label: "Completada" },
];

export function TaskFilters({ filters, onFilterChange }: TaskFiltersProps) {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, [field]: e.target.value });
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
      <TextField
        label="Buscar tarea"
        size="small"
        value={filters.taskName}
        onChange={handleChange("taskName")}
        sx={{ minWidth: 220 }}
      />
      <TextField
        select
        label="Estado"
        size="small"
        value={filters.taskStatus}
        onChange={handleChange("taskStatus")}
        sx={{ minWidth: 160 }}
      >
        {statusOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
