import { jest } from "@jest/globals";

// Create a mock db
jest.unstable_mockModule("../src/db.js", () => ({
  // create a "spy" function that returns some metadata (ex: no. of invocations)
  insert: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

// Before each test, clear the mock DB
beforeEach(() => {
  insert.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

describe("Notes CLI", () => {
  test("newNote inserts data and returns it", async () => {
    const note = {
      content: "This is my note",
      id: Date.now(),
      tags: ["hello"],
    };

    const result = await newNote(note.content, note.tags);
    expect(result).toEqual(note);
  });

  test("getAllNotes returns all notes", async () => {
    const db = {
      notes: ["note1", "note2", "note3"],
    };

    // use the db const as the mock db in this context
    getDB.mockResolvedValue(db);

    const result = await getAllNotes();
    expect(result).toEqual(db.notes);
  });

  test("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];

    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });
});
