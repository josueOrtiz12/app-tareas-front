import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiConfig } from "../../deploy/api.config";
import { taskServices } from "./taskServices";

const mockFetch = vi.fn();

beforeEach(() => {
  mockFetch.mockReset();
  vi.spyOn(apiConfig, "fetch").mockImplementation(mockFetch);
});

describe("taskServices", () => {
  it("getAll: debe llamar a GET /tasks con query params", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ data: [], pagination: { totalItems: 0 } }) });
    const result = await taskServices.getAll({ limit: "10", page: "1", taskName: "", taskStatus: "" });
    expect(mockFetch).toHaveBeenCalledWith("/tasks?limit=10&page=1&taskName=&taskStatus=", { method: "GET" });
    expect(result).toEqual({ data: [], pagination: { totalItems: 0 } });
  });

  it("create: debe enviar POST /tasks con el body", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true, data: { task_id: "abc" } }) });
    const body = { title: "Nueva tarea", description: "Descripción", status: "PENDIENTE" };
    const result = await taskServices.create(body);
    expect(mockFetch).toHaveBeenCalledWith("/tasks", { method: "POST", body: JSON.stringify(body) });
    expect(result).toEqual({ success: true, data: { task_id: "abc" } });
  });

  it("create: debe lanzar error si la respuesta falla", async () => {
    mockFetch.mockResolvedValue({ ok: false, json: () => Promise.resolve({ message: "Error" }) });
    await expect(taskServices.create({ title: "", description: "", status: "" })).rejects.toThrow("Error");
  });

  it("update: debe enviar PUT /tasks/:id", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) });
    await taskServices.update("id-123", { title: "Actualizado" });
    expect(mockFetch).toHaveBeenCalledWith("/tasks/id-123", { method: "PUT", body: JSON.stringify({ title: "Actualizado" }) });
  });

  it("delete: debe enviar DELETE /tasks/:id", async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ success: true }) });
    await taskServices.delete("id-456");
    expect(mockFetch).toHaveBeenCalledWith("/tasks/id-456", { method: "DELETE" });
  });

  it("delete: debe lanzar error si falla", async () => {
    mockFetch.mockResolvedValue({ ok: false });
    await expect(taskServices.delete("id-456")).rejects.toThrow("Error al eliminar tarea");
  });
});
