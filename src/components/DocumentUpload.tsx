import React, { useCallback, useState, useRef } from 'react';
import { FileUp, X, File, FilePlus } from 'lucide-react';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const DocumentUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  }, [isDragging]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
      
      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addFiles = (newFiles: File[]) => {
    const filesToAdd = newFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setFiles(prev => [...prev, ...filesToAdd]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 
                 lg:w-1/4 h-full flex flex-col transition-all duration-300">
      <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Documents</h2>
      
      <div 
        className={`
          border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center 
          transition-all duration-200 cursor-pointer mb-4 flex-grow
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
        `}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          onChange={handleFileSelection} 
          multiple 
        />
        
        <div className="flex flex-col items-center text-center">
          <FileUp 
            className={`h-10 w-10 mb-3 ${
              isDragging ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
            }`} 
          />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Drag & drop files here
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            or click to browse
          </p>
          <button 
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                      transition-colors duration-200 flex items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <FilePlus className="h-4 w-4 mr-2" />
            Select Files
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="overflow-y-auto">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Uploaded Files ({files.length})
          </h3>
          <ul className="space-y-2">
            {files.map(file => (
              <li 
                key={file.id} 
                className="flex items-center p-2 border border-gray-200 dark:border-gray-700 
                         rounded-lg bg-gray-50 dark:bg-gray-700 animate-fade-in"
              >
                <File className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 dark:text-white truncate font-medium">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <button 
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors duration-200"
                  onClick={() => removeFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;