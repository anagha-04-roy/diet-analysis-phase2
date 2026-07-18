"use client";

export default function ExecutionTime({ meta }: { meta: any }) {
  if (!meta) return null;

  return (
    <div className="mt-4 p-3 bg-gray-100 border border-gray-300 rounded-xl text-sm text-gray-700">
      {meta.execution_time_ms && (
        <p>
          <strong>Execution Time:</strong> {meta.execution_time_ms} ms
        </p>
      )}

      {meta.timestamp && (
        <p>
          <strong>Timestamp:</strong> {meta.timestamp}</p>
      )}

      {meta.function_name && (
        <p>
          <strong>Function:</strong> {meta.function_name}</p>
      )}
    </div>
  );
}
