#!/usr/bin/env node
import {entry} from '../src';
import generateCommand from '../src/commands/generate';
import commonCommands from '../src/commands/common';

commonCommands(entry);
generateCommand(entry);
entry.strictCommands().parse();
