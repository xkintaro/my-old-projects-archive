"use client";

import { deleteDynamicRecord } from "@/core/registry/actions";

export default function DeleteButton({ moduleId, id }: { moduleId: string, id: string }) {

  const handleDelete = (e: React.FormEvent) => {

    if (!confirm("Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
      e.preventDefault();
    }

  };

  return (

    <form action={deleteDynamicRecord.bind(null, moduleId)} onSubmit={handleDelete}>

      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
      >
        🗑️
      </button>

    </form>

  );

}