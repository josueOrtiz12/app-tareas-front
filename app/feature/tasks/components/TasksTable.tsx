import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Chip, TablePagination, IconButton, Tooltip
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import type { Task } from "../../../types/task";
import { themeTokens } from "../../../styles/themeTokens";

interface TasksTableProps {
  tasks: Task[];
  page: number;
  rowsPerPage: number;
  totalItems: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusColor: Record<string, "warning" | "info" | "success" | "default"> = {
  PENDIENTE: "warning",
  EN_PROGRESO: "info",
  COMPLETADA: "success",
};

export function TasksTable({ tasks, page, rowsPerPage, totalItems, loading, onPageChange, onRowsPerPageChange, onView, onEdit, onDelete }: TasksTableProps) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: themeTokens.table.headerBg }}>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }}>Título</TableCell>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }}>Descripción</TableCell>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }}>Estado</TableCell>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }}>Fecha Límite</TableCell>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }}>Creada</TableCell>
              <TableCell sx={{ color: themeTokens.table.headerText, fontWeight: 700 }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  {loading ? "Cargando..." : "No hay tareas"}
                </TableCell>
              </TableRow>
            ) : tasks.map((task) => (
              <TableRow key={task.task_id} hover>
                <TableCell sx={{ fontWeight: 500 }}>{task.task_name}</TableCell>
                <TableCell>{task.task_description || "—"}</TableCell>
                <TableCell>
                  <Chip
                    label={task.task_status.replace("_", " ")}
                    color={statusColor[task.task_status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{task.task_limit ? new Date(task.task_limit).toLocaleDateString() : "—"}</TableCell>
                <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Ver"><IconButton size="small" onClick={() => onView(task)}><Visibility fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Editar"><IconButton size="small" onClick={() => onEdit(task)}><Edit fontSize="small" /></IconButton></Tooltip>
                  <Tooltip title="Eliminar"><IconButton size="small" onClick={() => onDelete(task)}><Delete fontSize="small" /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalItems}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => onRowsPerPageChange(parseInt(e.target.value, 10))}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
}
