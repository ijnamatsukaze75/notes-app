import { pool } from "../config/db.js";

//mendapatkan semua catatan
export const getAllNotesHandler = async (req, res) => {
  const [notes] = await pool.query("SELECT * FROM notes");

  res.status(200).json({
    status: "success",
    data: notes,
  });
};

export const addNoteHandler = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      status: "Fail",
      message: "Title is required",
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      status: "Fail",
      message: "Content is required",
    });
  }

  //simpan ke database
  const [insertResult] = await pool.query(
    "INSERT INTO notes (title, content) VALUES (?, ?)",
    [title, content]
  );

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [
    insertResult.insertId,
  ]);

  res.status(201).json({
    status: "success",
    message: "Note Created",
    data: vnotes[0],
  });
};

export const getNoteByIdHandler = async (req, res) => {
  const { id } = req.params;

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.leght === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: notes[0],
  });
};

export const updateNoteByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      status: "Fail",
      message: "Title is required",
    });
  }

  if (!content || !content.trim()) {
    return res.status(400).json({
      status: "Fail",
      message: "Content is required",
    });
  }

  await pool.query("UPDATE notes SET title=?, content=? WHERE id=?", [
    title,
    content,
    id,
  ]);

  const [notes] = await pool.query("SELECT * FROM notes WHERE id = ?", [id]);

  if (notes.leght === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Note updated successfully",
    data: notes[0],
  });
};

export const deleteNoteByIdHandler = async (req, res) => {
  const { id } = req.params;


  const [deletenote] = await pool.query("DELETE FROM notes WHERE id = ?", [id]);

  if (deletenote.affectedRows === 0) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
  });
};
