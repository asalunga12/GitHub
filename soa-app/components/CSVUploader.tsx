"use client";

import { useCallback, useRef, useState } from "react";
import Papa from "papaparse";

interface Registrant {
  name: string;
  email: string;
}

interface CSVUploaderProps {
  onUpload: (registrants: Registrant[]) => void;
}

export default function CSVUploader({ onUpload }: CSVUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file.");
        return;
      }

      setFileName(file.name);

      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase(),
        complete(results) {
          const registrants: Registrant[] = [];
          const errors: string[] = [];

          results.data.forEach((row, idx) => {
            const name = (row["name"] ?? "").trim();
            const email = (row["email"] ?? "").trim();

            if (!name) {
              errors.push(`Row ${idx + 2}: missing name`);
              return;
            }
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              errors.push(`Row ${idx + 2}: invalid email`);
              return;
            }
            registrants.push({ name, email });
          });

          if (errors.length > 0) {
            setError(`Some rows were skipped: ${errors.slice(0, 3).join("; ")}${errors.length > 3 ? ` (+${errors.length - 3} more)` : ""}`);
          }

          if (registrants.length === 0) {
            setError("No valid registrants found in the CSV.");
            return;
          }

          onUpload(registrants);
        },
        error(err) {
          setError(`Failed to parse CSV: ${err.message}`);
        },
      });
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-green-500 bg-green-50"
            : "border-gray-300 hover:border-green-400 hover:bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleChange}
        />
        <svg
          className="mx-auto w-10 h-10 text-gray-400 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        {fileName ? (
          <p className="text-sm font-medium text-green-700">{fileName}</p>
        ) : (
          <>
            <p className="text-sm font-medium text-gray-700">
              Drop CSV here or <span className="text-green-600">browse</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Format: name, email (one per row)
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="text-xs text-gray-500">
        <span className="font-medium">Expected CSV format:</span>
        <code className="ml-1 bg-gray-100 px-1 rounded">name,email</code>
      </div>
    </div>
  );
}
