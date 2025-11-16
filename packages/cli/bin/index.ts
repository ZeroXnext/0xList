#!/usr/bin/env node
import {entry} from '../src';
import addBumpCommand from '../src/commands/bump';
import addGenerateCommand from '../src/commands/generate';
import addAggregate from '../src/commands/aggregate';

addGenerateCommand(entry);
addBumpCommand(entry);
addAggregate(entry);
entry.strictCommands().parse();
