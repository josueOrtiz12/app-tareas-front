import { apiConfig } from "../../deploy/api.config";
import type { Task } from "../types/task";

export const taskServices = {
  getAll: async (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    const response = await apiConfig.fetch(`/tasks?${query}`, { method: "GET" });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  },

  getById: async (id: string) => {
    const response = await apiConfig.fetch(`/tasks/${id}`, { method: "GET" });
    if (!response.ok) throw new Error(`Error ${response.status}`);
    return response.json();
  },

  create: async (data: Record<string, string>) => {
    const response = await apiConfig.fetch("/tasks", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Error al crear tarea");
    }
    return response.json();
  },

  update: async (id: string, data: Record<string, string>) => {
    const response = await apiConfig.fetch(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Error al actualizar tarea");
    }
    return response.json();
  },

  delete: async (id: string) => {
    const response = await apiConfig.fetch(`/tasks/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar tarea");
    return response.json();
  },
};
