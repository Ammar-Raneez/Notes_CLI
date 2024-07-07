import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a note', yargs => {
    return yargs.positional('note', {
      type: 'string',
      description: 'The content of the note to create',
    })
  }, argv => {
    console.log('Hello: ', argv.note)
  })
  .options('tags', {
    alias: 't',
    type: 'string',
    description: 'Tags to add to the note'
  })
  .demandCommand(1)
  .parse()

