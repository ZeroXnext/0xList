import {Entry} from '@types';

function addBumpCommand(entry: Entry): void {
  entry.command("bump", "It auto-updates the version of the token list, according to rules", () => {}, () => {

  });
}

export default addBumpCommand;
