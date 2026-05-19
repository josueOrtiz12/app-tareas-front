import { useState, useEffect, useCallback } from "react";
import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { taskServices } from "../../services/taskServices";
import type { Task } from "../../types/task";
import { TaskFilters } from "./components/TaskFilters";
import { TasksTable } from "./components/TasksTable";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { EditTaskDialog } from "./components/EditTaskDialog";
import { ViewTaskDialog } from "./components/ViewTaskDialog";
import { DeleteTaskDialog } from "./components/DeleteTaskDialog";

export function TasksModule() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({ taskName: "", taskStatus: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTask, setDeleteTask] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await taskServices.getAll({
        limit: rowsPerPage.toString(),
        page: (page + 1).toString(),
        taskName: filters.taskName || "",
        taskStatus: filters.taskStatus || "",
      });
      setTasks(result.data || []);
      setTotalItems(result.pagination?.totalItems || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filters]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const handleDelete = async () => {
    if (!deleteTask) return;
    setDeleting(true);
    try {
      await taskServices.delete(deleteTask.task_id);
      setDeleteTask(null);
      fetchTasks();
    } catch {
      setError("Error al eliminar tarea");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" fontWeight="700">Lista de Tareas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateOpen(true)}>
          Nueva Tarea
        </Button>
      </Box>
      <TaskFilters filters={filters} onFilterChange={(f) => { setFilters(f); setPage(0); }} />
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>}
      {loading && tasks.length === 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}><CircularProgress /></Box>
      ) : (
        <TasksTable
          tasks={tasks}
          page={page}
          rowsPerPage={rowsPerPage}
          totalItems={totalItems}
          loading={loading}
          onPageChange={setPage}
          onRowsPerPageChange={(r) => { setRowsPerPage(r); setPage(0); }}
          onView={setViewTask}
          onEdit={setEditTask}
          onDelete={setDeleteTask}
        />
      )}
      <CreateTaskDialog open={createOpen} onClose={() => setCreateOpen(false)} onCreated={fetchTasks} />
      <ViewTaskDialog open={!!viewTask} task={viewTask} onClose={() => setViewTask(null)} />
      <EditTaskDialog open={!!editTask} task={editTask} onClose={() => setEditTask(null)} onUpdated={fetchTasks} />
      <DeleteTaskDialog open={!!deleteTask} task={deleteTask} onClose={() => setDeleteTask(null)} onConfirm={handleDelete} submitting={deleting} />
    </Box>
  );
}
