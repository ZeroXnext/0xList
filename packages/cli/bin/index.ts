#!/usr/bin/env node
import {entry} from '../src';
import generateCommand from '../src/commands/generate';
import addBumpCommand from '../src/commands/bump';
generateCommand(entry);
addBumpCommand(entry);
entry.strictCommands().parse();
