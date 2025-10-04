"use client";

import React, { useState, useEffect, Fragment } from "react";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { createBook, updateBook, deleteBook } from "../../src/services/bookService";

type BookData = {
  [key: string]: any;
  title: string;
  author: string;
  status: "lido" | "lendo" | "quero_ler" | "";
};

type FormErrors = {
  [K in keyof BookData]?: string;
};

interface BookFormProps {
  initialData?: BookData;
}

export default function BookForm({ initialData }: BookFormProps) {
  const [formData, setFormData] = useState<BookData>({
    title: "",
    author: "",
    status: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const requiredFields = ["title", "author"];
    const completedFields = requiredFields.filter(
      (field) => formData[field] && formData[field].trim() !== ""
    ).length;
    const newProgress = (completedFields / requiredFields.length) * 100;
    setProgress(newProgress);
  }, [formData]);

  const validate = (fieldValues = formData) => {
    let tempErrors: FormErrors = {};
    if (!fieldValues.title.trim()) {
      tempErrors.title = "O título do livro é obrigatório.";
    }
    if (!fieldValues.author.trim()) {
      tempErrors.author = "O nome do autor é obrigatório.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name as keyof BookData]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let tempErrors: FormErrors = { ...errors };
    if (!value.trim()) {
      tempErrors[name as keyof BookData] = `O campo ${
        name === "title" ? "título" : "autor"
      } é obrigatório.`;
    } else {
      tempErrors[name as keyof BookData] = undefined;
    }
    setErrors(tempErrors);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Por favor, corrija os erros antes de salvar.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && initialData?.id) {
        await updateBook(initialData.id, formData);
        toast.success("Livro atualizado com sucesso!");
      } else {
        await createBook(formData);
        toast.success("Livro salvo com sucesso!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar livro.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleDelete = async () => {
    setIsModalOpen(false);
    try {
      if (initialData?.id) {
        await deleteBook(initialData.id);
        toast.success("Livro excluído com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao excluir livro.");
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Título do Livro *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Autor *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className={`block w-full px-3 py-2 border rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.author
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
            />
            {errors.author && (
              <p className="text-red-600 text-sm mt-1">{errors.author}</p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Informações Adicionais (Opcional)
          </h3>
          <div className="mt-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status de Leitura
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              <option value="lido">Lido</option>
              <option value="lendo">Lendo</option>
              <option value="quero_ler">Quero Ler</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div>
            {isEditMode && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                Excluir Livro
              </button>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirmar Exclusão
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Você tem certeza que deseja excluir este livro? Esta ação
                      não poderá ser desfeita.
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    >
                      Confirmar Exclusão
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
