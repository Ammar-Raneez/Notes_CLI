import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  // <angle-bracket> - required argument; [square-bracket] - optional argument
  .command(
    "new <note>",
    "Create a note",
    (yargs) => {
      return yargs.positional("note", {
        type: "string",
        description: "The content of the note to create",
      });
    },
    (argv) => {
      console.log("Hello: ", argv.note);
    },
  )
  .options("tags", {
    alias: "t",
    type: "string",
    description: "Tags to add to the note",
  })
  .command(
    "all",
    "Get all notes",
    () => { },
    async (argv) => { },
  )
  .command(
    "find <filter>",
    "Get matching notes",
    (yargs) => {
      return yargs.positional("filter", {
        describe:
          "The search term to filter notes by, will be applied to note.content",
        type: "string",
      });
    },
    async (argv) => { },
  )
  .command(
    "remove <id>",
    "remove a note by id",
    (yargs) => {
      return yargs.positional("id", {
        type: "number",
        description: "The id of the note you want to remove",
      });
    },
    async (argv) => { },
  )
  .command(
    "web [port]",
    "launch website to see notes",
    (yargs) => {
      return yargs.positional("port", {
        describe: "port to bind on",
        default: 5000,
        type: "number",
      });
    },
    async (argv) => { },
  )
  .command(
    "clean",
    "remove all notes",
    () => { },
    async (argv) => { },
  )
  .demandCommand(1)
  .parse();
